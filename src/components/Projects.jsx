import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Layers, ExternalLink } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import './Projects.css'

const GithubIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const projects = [
  {
    id: 'expense-tracker',
    title: 'Expense Tracker App',
    description:
      'A feature-rich personal finance app built with React Native & Firebase. Track spending, set budgets, visualize trends with interactive charts, and get smart saving insights — all in real time.',
    image: '/expense-tracker.png',
    tags: ['React Native', 'Firebase', 'Expo', 'Redux'],
    tagColors: ['', 'cyan', 'pink', ''],
    accent: '#8b5cf6',
    demo: '#',
    github: '#',
  },
  {
    id: 'ecommerce-site',
    title: 'E-Commerce Website',
    description:
      'A full-featured online store with product listings, cart management, secure checkout, and an admin dashboard. Powered by Node.js REST APIs and a React frontend with smooth UX.',
    image: '/ecommerce.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    tagColors: ['cyan', '', 'pink', ''],
    accent: '#22d3ee',
    demo: '#',
    github: '#',
  },
  {
    id: 'dashboard-app',
    title: 'Patient Wait List Analysis',
    description:
      'A comprehensive healthcare analytics dashboard built to analyze patient wait lists. Features include multi-dimensional filtering, specialty ranking, and trend analysis — originally modeled from Power BI insights.',
    image: '/dashboard.png',
    tags: ['React', 'Power BI', 'Data Analysis', 'Recharts'],
    tagColors: ['', 'cyan', 'pink', ''],
    accent: '#ec4899',
    demo: '#',
    github: '#',
  },
]

function ProjectCard({ project, index, onShowDashboard }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const tilt = useTilt({ strength: 7, lift: 18, scale: 1.02 })

  const handleDemoClick = (e) => {
    if (project.id === 'dashboard-app') {
      e.preventDefault();
      onShowDashboard();
    }
  };

  const setRefs = (node) => {
    ref(node)
    tilt.ref.current = node
  }

  return (
    <motion.div
      ref={setRefs}
      className="project-card card tilt-card"
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 50, rotateX: -18 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
    >
      {/* Accent glow */}
      <div
        className="project-card__glow"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}30 0%, transparent 70%)` }}
      />

      {/* Image */}
      <div className="project-card__img-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-card__img"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('project-card__img-wrapper--error'); }}
        />
        <div className="project-card__img-overlay">
          <div className="project-card__links">
            <a href={project.demo} className="project-card__link" aria-label="Live Demo" onClick={handleDemoClick}>
              <ExternalLink size={18} /> Live Demo
            </a>
            <a href={project.github} className="project-card__link project-card__link--ghost" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
          </div>
        </div>
        <div className="project-card__number">0{index + 1}</div>
      </div>

      {/* Content */}
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.map((tag, i) => (
            <span key={tag} className={`tag ${project.tagColors[i] || ''}`}>{tag}</span>
          ))}
        </div>

        <div className="project-card__footer">
          <a href={project.demo} className="btn btn-primary project-card__btn" id={`demo-${project.id}`} onClick={handleDemoClick}>
            <ExternalLink size={14} /> Live Demo
          </a>
          <a href={project.github} className="btn btn-outline project-card__btn" id={`github-${project.id}`}>
            <GithubIcon size={14} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ onShowDashboard }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="projects section" ref={ref}>
      <div className="container">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge"><Layers size={12} /> Projects</span>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills across mobile, web, and backend development.
          </p>
        </motion.div>

        <div className="projects__grid perspective">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onShowDashboard={onShowDashboard} />
          ))}
        </div>
      </div>
    </section>
  )
}
