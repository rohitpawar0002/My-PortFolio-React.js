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
  const [open, setOpen] = useState(true)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hi! I'm ${profile.name.split(' ')[0]}'s site assistant — ask about his work, **${projects[0]?.name?.split('—')[0]?.trim() || 'Trackiza'}**, contact, or anything else (general questions are fine too).`,
    },
  ])
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const suggestRef = useRef(null)
  const [photoError, setPhotoError] = useState(false)
  const [suggestOpen, setSuggestOpen] = useState(false)

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
    if (!open) {
      setSuggestOpen(false)
      return
    }
    const t = setTimeout(() => inputRef.current?.focus(), 200)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (suggestOpen) {
          setSuggestOpen(false)
        } else {
          setOpen(false)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, suggestOpen])

  useEffect(() => {
    if (!suggestOpen) return
    const onDoc = (e) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target)) {
        setSuggestOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [suggestOpen])

  const send = useCallback(
    async (raw) => {
      debugger
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
        debugger
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: 'assistant', text: reply },
        ])
      } catch (e) {
        debugger
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
          <motion.button
            type="button"
            className="chatbot__backdrop"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot__panel-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
            id={panelId}
            role="dialog"
            aria-label="Chat with portfolio assistant"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chatbot__panel">
              <div className="chatbot__panel-accent" aria-hidden />
              <header className="chatbot__head">
                <div className="chatbot__head-brand">
                  <div
                    className={
                      photoError
                        ? 'chatbot__avatar chatbot__avatar--fallback'
                        : 'chatbot__avatar chatbot__avatar--photo'
                    }
                    aria-hidden
                  >
                    {photoError ? (
                      <span className="chatbot__avatar-fallback">
                        {profile.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    ) : (
                      <img
                        className="chatbot__avatar-img"
                        src={profile.photo}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        onError={() => setPhotoError(true)}
                      />
                    )}
                  </div>
                  <div className="chatbot__head-text">
                    <div className="chatbot__title-row">
                      <span className="chatbot__title">Ask {profile.name.split(' ')[0]}</span>
                      <span className="chatbot__status" title="Service online">
                        <span className="chatbot__status-dot" />
                        Online
                      </span>
                    </div>
                    <span className="chatbot__subtitle">Portfolio, projects, and more</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="chatbot__icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
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
                          ? 'chatbot__row chatbot__row--user'
                          : 'chatbot__row chatbot__row--bot'
                      }
                    >
                      {m.role === 'assistant' && (
                        <div className="chatbot__bubble-avatar" aria-hidden>
                          ✦
                        </div>
                      )}
                      <div
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
                      </div>
                    </li>
                  ))}
                  {loading && (
                    <li className="chatbot__row chatbot__row--bot">
                      <div className="chatbot__bubble-avatar" aria-hidden>
                        ✦
                      </div>
                      <div
                        className="chatbot__msg chatbot__msg--bot chatbot__typing"
                        aria-label="Assistant is typing"
                      >
                        <span />
                        <span />
                        <span />
                      </div>
                    </li>
                  )}
                </ul>

                <div
                  className="chatbot__suggestions-wrap"
                  ref={suggestRef}
                >
                  <div className="chatbot__suggest-dropdown">
                    <button
                      type="button"
                      className="chatbot__suggest-trigger"
                      id={`${id}-suggest-btn`}
                      aria-expanded={suggestOpen}
                      aria-controls={`${id}-suggest-list`}
                      aria-haspopup="listbox"
                      disabled={loading}
                      onClick={() => setSuggestOpen((v) => !v)}
                    >
                      <span className="chatbot__suggest-trigger-text">Quick questions</span>
                      <svg
                        className={
                          suggestOpen
                            ? 'chatbot__suggest-chev chatbot__suggest-chev--open'
                            : 'chatbot__suggest-chev'
                        }
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        aria-hidden
                      >
                        <path
                          fill="currentColor"
                          d="M7 10l5 5 5-5H7z"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {suggestOpen && (
                        <motion.ul
                          className="chatbot__suggest-menu"
                          id={`${id}-suggest-list`}
                          role="listbox"
                          aria-labelledby={`${id}-suggest-btn`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.16 }}
                        >
                          {SUGGESTIONS.map((s) => (
                            <li key={s} role="presentation">
                              <button
                                type="button"
                                className="chatbot__suggest-item"
                                role="option"
                                onClick={() => {
                                  setSuggestOpen(false)
                                  void send(s)
                                }}
                                disabled={loading}
                              >
                                {s}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <form
                className="chatbot__form"
                onSubmit={(e) => {
                  e.preventDefault()
                  void send()
                }}
              >
                <div className="chatbot__compose">
                  <label htmlFor={`${id}-input`} className="visually-hidden">
                    Message
                  </label>
                  <input
                    id={`${id}-input`}
                    ref={inputRef}
                    className="chatbot__input"
                    type="text"
                    autoComplete="off"
                    placeholder="Type a message…"
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
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                      <path
                        fill="currentColor"
                        d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2.01L2.01 21Z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="chatbot__hint">Press Enter to send · Esc to close</p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={open ? 'chatbot__fab chatbot__fab--open' : 'chatbot__fab chatbot__fab--mascot'}
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
          <img
            className="chatbot__fab-mascot"
            src="/chatbot-robot.png"
            alt=""
            width={80}
            height={80}
            loading="eager"
            decoding="async"
          />
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
