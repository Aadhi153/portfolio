import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import './Experience.css'

const experiences = [
  {
    id: 'aerixnova',
    role: 'Mobile App Developer',
    company: 'AerixNova Technologies Pte. Ltd.',
    location: 'Namakkal',
    period: 'Jan 2026 - Present',
    points: [
      'Led end-to-end development of a cross-platform personal finance application for a client, handling both mobile app development and backend integration',
      'Implemented secure, production-grade authentication (Google Sign-In/OAuth and email/password with persistent sessions)',
      'Architected real-time data synchronization between mobile client and backend services using Supabase',
      "Contributed to multiple products within the company's business software suite",
      'Collaborated cross-functionally with design and product teams across React Native, Next.js, and backend systems',
    ],
    tags: ['React Native', 'Next.js', 'Supabase', 'OAuth'],
  },
  {
    id: 'palle',
    role: 'Data Analyst Intern',
    company: 'Palle Technologies',
    location: 'Bangalore',
    period: 'Jun 2025 - Nov 2025',
    points: [
      'Cleaned and transformed raw datasets using Excel and SQL',
      'Built 3 automated Power BI dashboards — HR Analytics, Patient Analysis, and Pizza Sales',
    ],
    tags: ['Excel', 'SQL', 'Power BI', 'DAX'],
  },
]

function ExperienceCard({ exp, index, inView }) {
  const tilt = useTilt({ strength: 6, lift: 10, scale: 1.01 })

  return (
    <motion.div
      className="card tilt-card experience__card"
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
    >
      <div className="experience__card-header">
        <div>
          <h3 className="experience__role">{exp.role}</h3>
          <div className="experience__company">{exp.company}</div>
        </div>
        <div className="experience__meta">
          <span className="experience__meta-item"><Calendar size={13} /> {exp.period}</span>
          <span className="experience__meta-item"><MapPin size={13} /> {exp.location}</span>
        </div>
      </div>

      <ul className="experience__points">
        {exp.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <div className="experience__tags">
        {exp.tags.map((tag) => (
          <span key={tag} className="tag cyan">{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="experience section" ref={ref}>
      <div className="container">
        <motion.div
          className="experience__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge"><Briefcase size={12} /> Experience</span>
          <h2 className="section-title">Where I've Worked</h2>
          <p className="section-subtitle">
            Production roles that shaped how I build — from shipping mobile features to turning raw data
            into decisions.
          </p>
        </motion.div>

        <div className="experience__timeline">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
