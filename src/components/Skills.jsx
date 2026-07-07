import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Smartphone } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import './Skills.css'

const CORE_SKILLS = new Set([
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Node.js', 'Supabase',
])

const categories = [
  {
    icon: <Code size={18} />,
    title: 'Front-End / UI',
    tags: ['React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  },
  {
    icon: <Smartphone size={18} />,
    title: 'Mobile',
    tags: ['React Native', 'Expo', 'EAS Build', 'Twilio'],
  },
  {
    icon: <Database size={18} />,
    title: 'Back-End & Data',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'Python', 'Supabase', 'Firebase', 'Git & GitHub'],
  },
]

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const cardsListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, rotateX: -12 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const badgesVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const badgeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
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
      <motion.div className="skills__category-tags" variants={badgesVariants}>
        {cat.tags.map((tag) => (
          <motion.span
            key={tag}
            variants={badgeVariants}
            className={`tag cyan ${CORE_SKILLS.has(tag) ? 'badge-core' : 'badge-standard'}`}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="skills section" ref={ref}>
      <motion.div
        className="container"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="skills__header" variants={headerVariants}>
          <motion.span className="section-badge" variants={fadeUp}><Brain size={12} /> Skills</motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>My Technical Stack</motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            A curated list of frameworks, libraries, and languages I use to bring modern digital
            products to life — refined while shipping FreshCart and AerixNova into production.
          </motion.p>
        </motion.div>

        <motion.div className="skills__categories-list" variants={cardsListVariants}>
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={cardVariants}>
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
