/**
 * Serverless: Google Gemini (portfolio assistant for Rohit Pawar).
 * Set GEMINI_API_KEY in Netlify → Site → Environment variables.
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
 * Free tier: `gemini-2.0-flash` often hits quota:0 for free API keys. Default to 1.5 Flash.
 * Override in Netlify env: `GEMINI_MODEL=gemini-2.0-flash` (when your key has quota).
 */
const MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

function isQuotaError(message, status) {
  if (status === 429) return true
  const t = String(message || '')
  return /quota|rate limit|RESOURCE_EXHAUSTED|exceeded your current/i.test(t)
}

const SYSTEM_INSTRUCTION = `You are a friendly, professional portfolio assistant for Rohit Pawar, a software developer in Pune, India. You answer visitors' questions about Rohit's background, skills, work experience, projects, education, and how to get in touch.

Rules:
- Speak in first person as if helping Rohit ("he" for Rohit, you are the assistant on his site).
- Be concise but helpful; use short paragraphs or bullet points when appropriate.
- Only discuss Rohit and his career/portfolio. If asked something unrelated, politely steer back to his professional profile.
- If you do not have a fact in the context below, say you are not sure and suggest checking the site sections or contact details — do not invent credentials or employer claims.
- For contact, share only what is listed: email, phone, LinkedIn when relevant to the question.

About Rohit (facts you may use):
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

  try {
    const res = await fetch(`${API_URL}?key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents,
        generationConfig: {
          temperature: 0.65,
          maxOutputTokens: 1024,
        },
      }),
    })

    const data = await res.json()
    const topLevelError = data?.error && !data.candidates
    if (!res.ok || topLevelError) {
      const errMsg =
        (typeof data?.error === 'object' && data.error?.message) ||
        (typeof data?.error === 'string' ? data.error : null) ||
        data?.message ||
        res.statusText ||
        'Gemini request failed'
      if (isQuotaError(errMsg, res.status)) {
        return jsonResponse(200, {
          reply:
            "The AI service hit a free-tier limit (or is cooling down). Please try again in a minute. You can also read Rohit's **About**, **Projects**, and **Contact** sections on this page for the same information.",
        })
      }
      return jsonResponse(502, { error: errMsg, details: data?.error })
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
  } catch (err) {
    return jsonResponse(500, {
      error: err?.message || 'Unexpected server error',
    })
  }
}
