import { motion } from 'framer-motion'
import { Download, ArrowDown, Sparkles } from 'lucide-react'
import './Hero.css'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const roles = ['Full Stack Developer', 'React Native Developer', 'Web Developer']

export default function Hero() {
  return (
    <section id="home" className="hero section">
      <div className="container hero__grid">
        {/* Left content */}
        <div className="hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Sparkles size={12} />
              Available for freelance & collaboration
            </span>
          </motion.div>

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hi, I'm{' '}
            <span className="hero__name-gradient">Aadhi Piranav</span>
          </motion.h1>

          <motion.div
            className="hero__role-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hero__role">Full Stack Developer</span>
            <span className="hero__role-sub">React Native · Web Developer · Tamil Nadu, India</span>
          </motion.div>

          <motion.p
            className="hero__bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I build high-performance mobile apps and responsive websites with clean UI and scalable
            backend systems. Passionate about real-world solutions and continuously improving my craft.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#projects" className="btn btn-primary">
              View My Work
              <ArrowDown size={16} />
            </a>
            <a href="#contact" className="btn btn-outline">
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <a href="https://github.com/AadhiPiranav" target="_blank" rel="noreferrer" className="hero__social-btn" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/aadhipiranav" target="_blank" rel="noreferrer" className="hero__social-btn" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <div className="hero__social-divider" />
            <span className="hero__social-label">Connect with me</span>
          </motion.div>
        </div>

        {/* Right — Avatar / Visual */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero__avatar-ring">
            <div className="hero__avatar-inner">
              <div className="hero__avatar-code">
                <span className="hero__code-line"><span className="kw">const</span> dev = {'{'}</span>
                <span className="hero__code-line indent"><span className="key">name</span>: <span className="str">'Aadhi Piranav'</span>,</span>
                <span className="hero__code-line indent"><span className="key">stack</span>: [<span className="str">'React Native'</span>, <span className="str">'React'</span>, <span className="str">'Node'</span>],</span>
                <span className="hero__code-line indent"><span className="key">passion</span>: <span className="str">'Real-world solutions'</span>,</span>
                <span className="hero__code-line indent"><span className="key">location</span>: <span className="str">'Tamil Nadu, India'</span></span>
                <span className="hero__code-line">{'}'};</span>
              </div>
            </div>

            {/* Floating skill badges */}
            <div className="hero__badge hero__badge--react">⚛️ React</div>
            <div className="hero__badge hero__badge--node">🟢 Node.js</div>
            <div className="hero__badge hero__badge--mobile">📱 React Native</div>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {[
              { value: '3+', label: 'Years Exp.' },
              { value: '20+', label: 'Projects' },
              { value: '99%', label: 'Client Sat.' },
            ].map((s) => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="hero__scroll-dot" />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}
