import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { User, Zap, Coffee, MapPin, Mail, GraduationCap, Calendar } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import './About.css'

const highlights = [
  { icon: <Zap size={18} />, title: 'Fast Learner', desc: 'Quickly adapts to new technologies and frameworks.' },
  { icon: <Coffee size={18} />, title: 'Dedicated', desc: 'Committed to delivering high-quality, clean code.' },
  { icon: <User size={18} />, title: 'Team Player', desc: 'Collaborative approach to problem-solving and shipping.' },
]

const details = [
  { icon: <MapPin size={16} />, label: 'Location', value: 'Tamil Nadu, India' },
  { icon: <Mail size={16} />, label: 'Email', value: 'aadhi.piranav@email.com' },
  { icon: <GraduationCap size={16} />, label: 'Education', value: 'B.S. in Computer Science' },
  { icon: <Calendar size={16} />, label: 'Availability', value: 'Full-Time / Freelance' },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const tilt = useTilt({ strength: 8, lift: 16, scale: 1.015 })

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge"><User size={12} /> About Me</span>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">
            Passionate developer with a knack for building high-performance applications that matter.
          </p>
        </motion.div>

        <div className="about__grid">
          {/* Left Column: Visual Profile Card */}
          <motion.div
            className="about__profile-col perspective"
            style={{ transformPerspective: 1200 }}
            initial={{ opacity: 0, x: -40, rotateY: 20 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="card tilt-card about__card"
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
            >
              <div className="about__avatar">
                <span>AP</span>
              </div>
              <h3 className="about__name">Aadhi Piranav</h3>
              <p className="about__role-tag">Full Stack Developer</p>
              
              <div className="about__highlights">
                {highlights.map((h) => (
                  <div key={h.title} className="about__highlight">
                    <div className="about__highlight-icon">{h.icon}</div>
                    <div>
                      <div className="about__highlight-title">{h.title}</div>
                      <div className="about__highlight-desc">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Story & Details */}
          <motion.div
            className="about__story-col perspective"
            style={{ transformPerspective: 1200 }}
            initial={{ opacity: 0, x: 40, rotateY: -20 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about__story-content">
              <h3 className="about__story-title">
                Designing High-Impact Digital Experiences
              </h3>
              <p className="about__desc">
                I'm a passionate Full Stack Developer specializing in mobile and web applications.
                My expertise lies in building responsive web applications using <strong>React</strong> and 
                efficient, cross-platform mobile apps with <strong>React Native</strong>. On the server side, 
                I write scalable backend services with <strong>Node.js</strong> and manage robust database systems.
              </p>
              <p className="about__desc">
                I believe that programming is not just about writing code, but about solving real-world challenges
                and creating intuitive digital user journeys. I focus on writing clean, modular, and maintainable
                code, ensuring peak performance and visually stunning UI animations.
              </p>
              
              <div className="about__details-grid">
                {details.map((d) => (
                  <div key={d.label} className="about__detail-item">
                    <div className="about__detail-icon">{d.icon}</div>
                    <div>
                      <span className="about__detail-label">{d.label}</span>
                      <span className="about__detail-value">{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about__actions">
                <a href="#contact" className="btn btn-primary">Let's Work Together</a>
                <a href="#projects" className="btn btn-outline">Explore My Work</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
