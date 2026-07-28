import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Smartphone, CreditCard, BarChart3 } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import './Skills.css'

const CORE_SKILLS = new Set([
  'React Native', 'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Supabase (RLS, Realtime, Storage, Auth)', 'Power BI',
])

const categories = [
  {
    icon: <Smartphone size={18} />,
    title: 'Mobile',
    tags: ['React Native', 'JavaScript (JSX)', 'Expo', 'EAS Build', 'React Navigation', 'Google Sign-In (OAuth)'],
  },
  {
    icon: <Code size={18} />,
    title: 'Frontend',
    tags: ['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'TypeScript'],
  },
  {
    icon: <Database size={18} />,
    title: 'Backend',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'Supabase (RLS, Realtime, Storage, Auth)', 'PL/pgSQL'],
  },
  {
    icon: <CreditCard size={18} />,
    title: 'Payments & Integrations',
    tags: ['Stripe API', 'Nodemailer'],
  },
  {
    icon: <BarChart3 size={18} />,
    title: 'Data Analysis & BI',
    tags: ['Data Cleaning', 'EDA', 'KPI Tracking', 'Power BI', 'DAX', 'Excel Dashboards'],
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
            products to life — refined while building FreshCart and shipping products at AerixNova Technologies.
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
