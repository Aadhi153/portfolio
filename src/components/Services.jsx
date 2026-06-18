import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Briefcase, Smartphone, Globe, Server, Layers } from 'lucide-react'
import './Services.css'

const services = [
  {
    icon: <Smartphone size={24} />,
    title: 'Mobile App Development',
    desc: 'High-performance, cross-platform iOS and Android mobile applications built with React Native. Features smooth mapping integration, push notifications, offline databases, and fluid native transitions.',
    tags: ['React Native', 'Expo', 'Redux'],
    delay: 0.1,
  },
  {
    icon: <Globe size={24} />,
    title: 'Web App Development',
    desc: 'Premium, lightning-fast, and SEO-optimized single page web applications built with React and Vite. Focused on high-end animations, interactive components, responsive sizing, and semantic layouts.',
    tags: ['React.js', 'Vite', 'Framer Motion'],
    delay: 0.2,
  },
  {
    icon: <Server size={24} />,
    title: 'Full Stack Solutions',
    desc: 'Robust database architectures, secure user authentication systems, and blazing fast REST or GraphQL APIs designed with Node.js. Optimized for scale, high security, and clean separation of concerns.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    delay: 0.3,
  }
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="services section" ref={ref}>
      <div className="container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge"><Briefcase size={12} /> Services</span>
          <h2 className="section-title">What I Can Do For You</h2>
          <p className="section-subtitle">
            Custom development services to build high-performance products and take your ideas from concept to deployment.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              className="card service-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: service.delay }}
            >
              <div className="service-card__icon-wrapper">
                <div className="service-card__icon">{service.icon}</div>
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.desc}</p>
              <div className="service-card__tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="tag pink">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
