/**
 * Serverless: Google Gemini (portfolio assistant for Rohit Pawar).
 * Set GEMINI_API_KEY in Netlify → Site → Environment variables.
 *
 * --- Free tier / $0 (your responsibility) ---
 * - Use an API key from **Google AI Studio** (aistudio.google.com) for the **Gemini API** (this code calls
 *   `generativelanguage.googleapis.com`). That path is the usual free, rate-limited tier for individuals.
 * - **Do not** switch to Vertex AI / a Google Cloud project with **billing** enabled for paid generative
 *   products unless you intend to pay. This repo cannot enforce billing; only Google can.
 * - In Google’s admin / AI Studio, **do not** upgrade to paid products for this key if you want $0.
 * - Google’s policies and which models are “free” can change — check periodically:
 *   https://ai.google.dev/gemini-api/docs and https://ai.google.dev/gemini-api/docs/pricing
 * - `GEMINI_MODEL` is optional; defaults are Flash / Flash-Lite only (we reject obvious “Pro” model IDs
 *   below to reduce accidental paid-tier usage; Pro may still be billable on some projects).
 *
 * @see https://ai.google.dev/gemini-api/docs/deprecations
 */
/** CORS: include headers browsers send on preflight (content-type, accept, etc.). */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Content-Type, Accept, Origin, X-Requested-With, Access-Control-Request-Headers, Access-Control-Request-Method',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
  Vary: 'Origin',
}

/**
 * Single model: set `GEMINI_MODEL=gemini-2.5-flash` (no fallback).
 * If unset, we try these in order until one works (not found → try next).
 */
const DEFAULT_MODEL_FALLBACKS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-flash-lite',
]

/**
 * Reject model IDs that look like Pro / Ultra (typical paid tiers). Only Flash- / Flash-Lite–style IDs
 * are accepted for GEMINI_MODEL. This does not replace Google’s billing; it just blocks obvious mistakes.
 */
function isAllowedFreeStyleModelId(model) {
  const s = String(model || '')
    .toLowerCase()
    .trim()
  if (!s.startsWith('gemini-')) return false
  if (/-(pro|ultra)(-|$)/.test(s) && !/flash|lite/i.test(s)) return false
  return /flash|flash-lite|lite|embedding/i.test(s)
}

function getModelList() {
  const env = process.env.GEMINI_MODEL?.trim()
  if (env) {
    if (!isAllowedFreeStyleModelId(env)) {
      return {
        error:
          'This chat is limited to Flash / Flash-Lite (or similar) model IDs. Unset GEMINI_MODEL to use the defaults, or set e.g. gemini-2.5-flash. See the top of netlify/functions/chat.js.',
      }
    }
    return { models: [env] }
  }
  return { models: DEFAULT_MODEL_FALLBACKS }
}

function geminiUrl(model, key) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`
}

function isQuotaError(message, status) {
  if (status === 429) return true
  const t = String(message || '')
  return /quota|rate limit|RESOURCE_EXHAUSTED|exceeded your current/i.test(t)
}

/**
 * Google busy / capacity — retry next model, or return HTTP 200 with a kind message (not 502), so
 * Vite on localhost and the network tab do not show "Bad Gateway" for a temporary API issue.
 */
function isTransientOverload(message, status) {
  if (status === 503) return true
  const t = String(message || '')
  return /high demand|spikes in demand|UNAVAILABLE|overloaded|try again later|The model is currently|temporar(y|ily) unavailable|capacity issues|Deadline exceeded|deadline exceeded|too many requests|503|model is currently experiencing/i.test(
    t,
  )
}

function isModelUnavailable(message, status) {
  if (status === 404) return true
  const t = String(message || '')
  return /not found for API version|is not supported for generateContent|Call ListModels|was not found/i.test(
    t,
  )
}

function extractApiError(data, res) {
  return (
    (typeof data?.error === 'object' && data.error?.message) ||
    (typeof data?.error === 'string' ? data.error : null) ||
    data?.message ||
    res.statusText ||
    'Gemini request failed'
  )
}

const SYSTEM_INSTRUCTION = `You are the chat widget on Rohit Pawar's portfolio website, powered by Google Gemini. You behave like a normal helpful AI: answer general questions (ideas, short writing, coding tips, life hacks, etc.) clearly and in a friendly tone.

**Portfolio mode:** When the user asks about Rohit, his work, his résumé, projects, how to hire him, contact info, or his tech stack, use the facts in the "About Rohit" section below. Refer to him as "Rohit" (third person). You are the site's assistant, not Rohit himself.

**Accuracy:** For anything specific about Rohit's employment, companies, or credentials, stick to what is written below. Do not invent job titles, dates, or projects. If something is not in the context, say you are not sure and suggest the About/Projects/Contact sections of the site.

**Safety:** Do not help with anything illegal, harmful, or that violates clear safety policies. For contact details, use only the email, phone, and LinkedIn listed below when relevant.

**About Rohit (facts to use for portfolio / career questions):**
- Name: Rohit Pawar. Role: Software Developer. Location: Pune, India.
- Focus: real-time dashboards, GPS tracking mobile apps, REST APIs. Stack emphasis: Angular, React.js, Ionic, TypeScript, Node.js, Express.js, MS SQL, Google Maps, Capacitor, Bootstrap, HTML/CSS/SCSS, GitLab, Postman, Cursor AI.
- Summary: builds component-driven UIs, responsive layouts, API integration, maps/location features; this portfolio is React + Vite + Framer Motion.

Work experience:
1) Nueotel Communication Pvt. Ltd, Hinjawadi — Junior Software Developer, Sep 2024–Present. Angular 16+, Ionic, Capacitor, Node, Express, MS SQL, REST, Google Maps, Razorpay, Cursor AI. Highlights: real-time Angular government monitoring dashboards; Trackzia GPS app (Ionic) with geofencing, push, cart, Razorpay; reusable UI components; SMW iOS app for municipal vehicles; 15+ REST API endpoints.
2) Nuevas Technologies Pvt Ltd, Hinjawadi — Software Developer Intern, Jan 2024–Aug 2024. Angular dashboards for SMS, WhatsApp, Voice, RCS (Neotel); responsive UIs; performance tuning.

Notable projects:
- Trackiza: Ionic/Capacitor GPS personal tracking, maps, geofencing, push, production on App Store and Play Store, Razorpay in-app purchases.
- SWM Dashboard Monitor: Angular, maps, MS SQL, municipal solid-waste fleet monitoring, charts and route playback.
- Nueotel Communication: enterprise comms console (voice, OBD, campaigns, chatbot module analytics, RCS, WhatsApp send, etc.).
- Personal portfolio: this site — React, Vite, Framer Motion, project mockups and gallery.
- Authentic Papad: Angular e-commerce (auth, cart, orders).

Education: MSc-CA and BCA at Modern College, Ganeshkhind, Pune.
Awards: Star Performer Award (Nueotel) 2026; certification in robotics/embedded systems.

Contact (for visitors who want to connect): use site Contact section. Email: rohitt.pawar02@gmail.com, Phone: +91 9730023006, LinkedIn: linkedin.com/in/rohit-pawar-661aa2228. Resume PDF is linked on the site.`

function responseHeadersForJson() {
  return { ...CORS, 'Content-Type': 'application/json; charset=utf-8' }
}

function jsonResponse(statusCode, body) {
  return { statusCode, headers: responseHeadersForJson(), body: JSON.stringify(body) }
}

function toGeminiContents(history) {
  if (!Array.isArray(history) || history.length === 0) return []
  return history
    .filter((h) => h && (h.role === 'user' || h.role === 'model') && h.text)
    .map((h) => ({
      role: h.role,
      parts: [{ text: String(h.text) }],
    }))
}

function buildRequestBody(contents) {
  return {
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    contents,
    generationConfig: {
      temperature: 0.65,
      maxOutputTokens: 1024,
    },
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' })
  }

  const key = process.env.GEMINI_API_KEY
  if (!key) {
    return jsonResponse(500, {
      error: 'Server misconfiguration: missing GEMINI_API_KEY',
    })
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' })
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : ''
  if (!message) {
    return jsonResponse(400, { error: 'Missing "message" string' })
  }

  const history = toGeminiContents(payload.history)
  const contents = [...history, { role: 'user', parts: [{ text: message }] }]
  const body = JSON.stringify(buildRequestBody(contents))

  const listResult = getModelList()
  if (listResult.error) {
    return jsonResponse(400, { error: listResult.error })
  }
  const { models } = listResult
  let lastErr = 'No response from any model'

  try {
    for (let i = 0; i < models.length; i++) {
      const model = models[i]
      const res = await fetch(geminiUrl(model, key), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      const data = await res.json()
      const topLevelError = data?.error && !data.candidates

      if (!res.ok || topLevelError) {
        const errMsg = extractApiError(data, res)
        lastErr = errMsg

        if (res.status === 429 && i < models.length - 1) {
          continue
        }
        if (
          (isModelUnavailable(errMsg, res.status) || isTransientOverload(errMsg, res.status)) &&
          i < models.length - 1
        ) {
          continue
        }
        if (isTransientOverload(errMsg, res.status)) {
          return jsonResponse(200, {
            reply:
              "The AI service is very busy right now. Please try again in a few seconds — or use **About**, **Projects**, and **Contact** on this page for the same information without the AI.",
          })
        }
        if (isQuotaError(errMsg, res.status)) {
          return jsonResponse(200, {
            reply:
              "The AI service hit a usage limit. Please try again in a little while. You can also read Rohit's **About**, **Projects**, and **Contact** sections for the same details.",
          })
        }
        if (isModelUnavailable(errMsg, res.status)) {
          return jsonResponse(200, {
            reply:
              'This AI model is not available for your API key. In Netlify, the owner can set `GEMINI_MODEL` to a model from Google AI Studio (List models).',
          })
        }
        return jsonResponse(502, { error: errMsg, details: data?.error, model })
      }

      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        (data.candidates?.[0]?.finishReason === 'SAFETY'
          ? "I couldn't return that response. Please ask in a different way or browse the About and Projects sections on the site."
          : null)

      if (!text) {
        const block = data.candidates?.[0]?.safetyRatings
        return jsonResponse(200, {
          reply: block
            ? 'The reply was blocked by safety settings. Try rephrasing your question.'
            : 'No response from the model. Please try again.',
        })
      }

      return jsonResponse(200, { reply: text })
    }

    return jsonResponse(502, {
      error: lastErr,
      hint: 'Set GEMINI_MODEL in Netlify to a model your API key can use (see Google AI / ListModels).',
    })
  } catch (err) {
    return jsonResponse(500, {
      error: err?.message || 'Unexpected server error',
    })
  }
}
