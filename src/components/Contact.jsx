import { useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, MapPin, Clock, Phone } from 'lucide-react'
import './Contact.css'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const contactInfo = [
  { icon: <Mail size={20} />, label: 'Email', value: 'aadhip153@gmail.com', href: 'mailto:aadhip153@gmail.com' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+91 7094578249', href: 'tel:+917094578249' },
  { icon: <MapPin size={20} />, label: 'Location', value: 'Namakkal, Tamil Nadu', href: '#' },
  { icon: <Clock size={20} />, label: 'Availability', value: 'Open to opportunities', href: '#' },
]

const socialLinks = [
  { icon: <GithubIcon />, label: 'GitHub', href: 'https://github.com/Aadhi153' },
  { icon: <LinkedinIcon />, label: 'LinkedIn', href: 'https://linkedin.com/in/aadhi-piranav-r-t' },
  { icon: <Mail size={20} />, label: 'Email', href: 'mailto:aadhip153@gmail.com' },
]

const CONTACT_EMAIL = 'aadhip153@gmail.com'

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    const body = `From: ${form.name} (${form.email})\n\n${form.message}`
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl

    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 500)
  }

  return (
    <section id="contact" className="contact section" ref={ref}>
      <div className="container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge"><Mail size={12} /> Contact</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Info Panel */}
          <motion.div
            className="contact__info perspective"
            style={{ transformPerspective: 1200 }}
            initial={{ opacity: 0, x: -40, rotateY: 16 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="card contact__info-card">
              <h3 className="contact__info-title">Get In Touch</h3>
              <p className="contact__info-text">
                I'm currently available for freelance projects, full-time roles,
                and exciting collaborations. Let's build something amazing together!
              </p>

              <div className="contact__items">
                {contactInfo.map((item) => (
                  <a key={item.label} href={item.href} className="contact__item">
                    <div className="contact__item-icon">{item.icon}</div>
                    <div>
                      <div className="contact__item-label">{item.label}</div>
                      <div className="contact__item-value">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="contact__socials">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} className="contact__social" aria-label={s.label} target="_blank" rel="noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div className="contact__available">
                <span className="contact__available-dot" />
                Available for new projects
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="perspective"
            style={{ transformPerspective: 1200 }}
            initial={{ opacity: 0, x: 40, rotateY: -16 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <form className="card contact__form" onSubmit={handleSubmit} ref={formRef}>
              <h3 className="contact__form-title">Send a Message</h3>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-name" className="contact__label">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="contact__input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email" className="contact__label">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="contact__input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-subject" className="contact__label">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  className="contact__input"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message" className="contact__label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact__input contact__textarea"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className={`btn btn-primary contact__submit ${sending ? 'contact__submit--loading' : ''} ${sent ? 'contact__submit--sent' : ''}`}
                disabled={sending || sent}
              >
                {sent ? (
                  <><CheckCircle size={16} /> Message Sent!</>
                ) : sending ? (
                  <><div className="contact__spinner" /> Sending…</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
