import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Terminal } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import './Skills.css'

const categories = [
  {
    icon: <Code size={18} />,
    title: 'Front-End / UI',
    tags: ['React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  },
  {
    icon: <Terminal size={18} />,
    title: 'Back-End & Mobile',
    tags: ['Node.js', 'Express.js', 'React Native', 'Expo', 'EAS Build', 'Twilio', 'GraphQL', 'REST APIs', 'Python'],
  },
  {
    icon: <Database size={18} />,
    title: 'Cloud & Database',
    tags: ['Supabase', 'MongoDB', 'PostgreSQL', 'SQL', 'Firebase', 'AWS', 'Docker', 'Git & GitHub'],
  },
]

function CategoryCard({ cat }) {
  const tilt = useTilt({ strength: 6, lift: 12, scale: 1.01 })

  return (
    <div
      className="card tilt-card skills__category-card"
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className="skills__category-header">
        <div className="skills__category-icon">{cat.icon}</div>
        <h3 className="skills__category-title">{cat.title}</h3>
      </div>
      <div className="skills__category-tags">
        {cat.tags.map((tag) => (
          <span key={tag} className="tag cyan">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="skills section" ref={ref}>
      <div className="container">
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge"><Brain size={12} /> Skills</span>
          <h2 className="section-title">My Technical Stack</h2>
          <p className="section-subtitle">
            A curated list of frameworks, libraries, and languages I use to bring modern digital designs to life.
          </p>
        </motion.div>

        <div className="skills__categories-list">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24, rotateX: -12 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
