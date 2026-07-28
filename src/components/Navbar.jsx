import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import './Navbar.css'

const links = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive]         = useState('#home')
  const { theme, toggle }           = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      
      // Highlight Contact if scrolled to the absolute bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15
      if (isAtBottom) {
        setActive('#contact')
        return
      }

      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'services', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 140) {
            setActive(`#${sections[i]}`)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href) => {
    setActive(href)
    setMobileOpen(false)
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={() => handleLink('#home')}>
          <div className="navbar__logo-icon">
            <Code2 size={20} />
          </div>
          <span className="navbar__logo-text">Dev<span>.Portfolio</span></span>
        </a>

        {/* Desktop links */}
        <nav className="navbar__links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${active === link.href ? 'navbar__link--active' : ''}`}
              onClick={() => handleLink(link.href)}
            >
              {link.label}
              {active === link.href && (
                <motion.div className="navbar__link-underline" layoutId="underline" />
              )}
            </a>
          ))}
        </nav>

        {/* Theme toggle */}
        <button
          className="navbar__theme-toggle"
          onClick={toggle}
          aria-label="Toggle theme"
          id="theme-toggle"
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Sun size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Moon size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* CTA */}
        <a href="#contact" className="btn btn-primary navbar__cta" onClick={() => handleLink('#contact')}>
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`navbar__mobile-link ${active === link.href ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => handleLink(link.href)}
              >
                {link.label}
              </a>
            ))}
            <div className="navbar__mobile-bottom">
              <button className="navbar__theme-toggle" onClick={toggle} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <a href="#contact" className="btn btn-primary" onClick={() => handleLink('#contact')}>
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
