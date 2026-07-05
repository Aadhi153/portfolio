import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Terminal } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import './Skills.css'

const coreSkills = [
  { name: 'React',         level: 92, color: '#61dbfb', icon: '⚛️' },
  { name: 'React Native',  level: 88, color: '#8b5cf6', icon: '📱' },
  { name: 'Node.js',       level: 85, color: '#68a063', icon: '🟢' },
  { name: 'MongoDB',       level: 80, color: '#4db33d', icon: '🍃' },
  { name: 'TypeScript',    level: 78, color: '#3178c6', icon: '🔷' },
  { name: 'Firebase',      level: 82, color: '#ffca28', icon: '🔥' },
]

const categories = [
  {
    icon: <Code size={18} />,
    title: 'Front-End / UI',
    tags: ['React', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  },
  {
    icon: <Terminal size={18} />,
    title: 'Back-End & Mobile',
    tags: ['Node.js', 'Express.js', 'React Native', 'Expo', 'GraphQL', 'REST APIs'],
  },
  {
    icon: <Database size={18} />,
    title: 'Cloud & Database',
    tags: ['MongoDB', 'PostgreSQL', 'Firebase', 'AWS', 'Docker', 'Git & GitHub'],
  },
]

function SkillBar({ skill, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      className="skill-item"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <div className="skill-header">
        <span className="skill-name">
          <span className="skill-emoji">{skill.icon}</span> {skill.name}
        </span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{
            background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
            boxShadow: `0 0 12px ${skill.color}88`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

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
  const cardTilt = useTilt({ strength: 5, lift: 10, scale: 1.005 })

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

        <div className="skills__grid">
          {/* Left Column: Skill Bars */}
          <motion.div
            className="skills__bars-col perspective"
            style={{ transformPerspective: 1200 }}
            initial={{ opacity: 0, x: -40, rotateY: 18 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="card tilt-card skills__card"
              ref={cardTilt.ref}
              onMouseMove={cardTilt.onMouseMove}
              onMouseLeave={cardTilt.onMouseLeave}
            >
              <h3 className="skills__card-title">Core Proficiency</h3>
              <div className="skills-list">
                {coreSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stack Categories */}
          <motion.div
            className="skills__categories-col perspective"
            style={{ transformPerspective: 1200 }}
            initial={{ opacity: 0, x: 40, rotateY: -18 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="skills__categories-list">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 24, rotateX: -12 }}
                  animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <CategoryCard cat={cat} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
