import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, projects } from '../data/content.js'

/** Production: same origin. Dev: Vite proxies /api/chat → your deployed function (no CORS). */
const CHAT_URL = import.meta.env.DEV
  ? '/api/chat'
  : '/.netlify/functions/chat'

const SUGGESTIONS = [
  "What are Rohit's strongest skills?",
  'Tell me about the Trackiza app',
  "What's Rohit working on now?",
  'How can I get in touch?',
]

function buildHistory(msgs) {
  const out = []
  for (const m of msgs) {
    if (m.id === 'welcome') continue
    if (m.role === 'user') {
      out.push({ role: 'user', text: m.text })
    } else if (m.role === 'assistant') {
      out.push({ role: 'model', text: m.text })
    }
  }
  return out
}

export function Chatbot() {
  const id = useId()
  const panelId = `${id}-panel`
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hi! I'm the assistant for ${profile.name}. Ask me about his experience, projects like **${projects[0]?.name?.split('—')[0]?.trim() || 'Trackiza'}**, or how to connect.`,
    },
  ])
  const listRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToEnd = useCallback(() => {
    const el = listRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToEnd()
  }, [messages, open, scrollToEnd])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 200)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = useCallback(
    async (raw) => {
      const text = (typeof raw === 'string' ? raw : input).trim()
      if (!text || loading) return

      setInput('')
      const userMsg = { id: `u-${Date.now()}`, role: 'user', text }
      setMessages((prev) => [...prev, userMsg])
      setLoading(true)

      try {
        const history = buildHistory(messages)
        const res = await fetch(CHAT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(
            data.error || data.message || `Request failed (${res.status})`,
          )
        }
        const reply = data.reply
        if (!reply || typeof reply !== 'string') {
          throw new Error('No reply from assistant')
        }
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: 'assistant', text: reply },
        ])
      } catch (e) {
        const hint =
          e?.message ||
          'Could not reach the assistant. If you are on `npm run dev` only, use `netlify dev` (or open the live site) so the chat API is available.'
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: `Sorry — something went wrong. ${hint}`,
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [input, loading, messages],
  )

  return (
    <div className="chatbot" aria-live="polite">
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot__panel-wrap"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            id={panelId}
            role="dialog"
            aria-label="Chat with portfolio assistant"
          >
            <div className="chatbot__panel">
              <header className="chatbot__head">
                <div className="chatbot__head-text">
                  <span className="chatbot__title">Ask about {profile.name.split(' ')[0]}</span>
                  <span className="chatbot__subtitle">Powered by Google Gemini</span>
                </div>
                <button
                  type="button"
                  className="chatbot__icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M6.4 5.31L12 10.9l5.6-5.6 1.1 1.09L13.1 12l5.6 5.6-1.1 1.1L12 13.1l-5.6 5.6-1.1-1.1L10.9 12 5.3 6.4l1.1-1.09Z"
                    />
                  </svg>
                </button>
              </header>

              <div className="chatbot__body">
                <ul className="chatbot__messages" ref={listRef}>
                  {messages.map((m) => (
                    <li
                      key={m.id}
                      className={
                        m.role === 'user'
                          ? 'chatbot__msg chatbot__msg--user'
                          : 'chatbot__msg chatbot__msg--bot'
                      }
                    >
                      {m.text.split('\n').map((line, i, arr) => (
                        <span key={i}>
                          <MessageLine line={line} />
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </li>
                  ))}
                  {loading && (
                    <li className="chatbot__msg chatbot__msg--bot chatbot__typing" aria-label="Assistant is typing">
                      <span />
                      <span />
                      <span />
                    </li>
                  )}
                </ul>

                <div className="chatbot__suggestions" aria-label="Suggested questions">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="chatbot__chip"
                      onClick={() => void send(s)}
                      disabled={loading}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <form
                className="chatbot__form"
                onSubmit={(e) => {
                  e.preventDefault()
                  void send()
                }}
              >
                <label htmlFor={`${id}-input`} className="visually-hidden">
                  Message
                </label>
                <input
                  id={`${id}-input`}
                  ref={inputRef}
                  className="chatbot__input"
                  type="text"
                  autoComplete="off"
                  placeholder="Ask anything about Rohit…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="chatbot__send"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2.01L2.01 21Z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="chatbot__fab"
        onClick={() => {
          setOpen((o) => !o)
        }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
            <path
              fill="currentColor"
              d="M6.4 5.31L12 10.9l5.6-5.6 1.1 1.09L13.1 12l5.6 5.6-1.1 1.1L12 13.1l-5.6 5.6-1.1-1.1L10.9 12 5.3 6.4l1.1-1.09Z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
            <path
              fill="currentColor"
              d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"
            />
            <path fill="currentColor" d="M7 9h2v2H7zm4 0h6v2h-6zm-4 3h2v2H7zm4 0h6v2h-6z" />
          </svg>
        )}
      </motion.button>
    </div>
  )
}

/** Bold **markdown-like** in one line (minimal) */
function MessageLine({ line }) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return <strong key={i}>{p.slice(2, -2)}</strong>
        }
        return <span key={i}>{p}</span>
      })}
    </>
  )
}
