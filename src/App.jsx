import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import Preloader from './components/Preloader'
import NetworkBackground from './components/NetworkBackground'
import { ThemeProvider } from './ThemeContext'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  // Animation variants for the main content entrance
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <ThemeProvider>
      {!isAppReady && <Preloader onComplete={() => setIsAppReady(true)} />}
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        pointerEvents: isAppReady ? 'auto' : 'none' 
      }}>
        {/* Background decoration */}
        <NetworkBackground />

        <AnimatePresence>
          {isAppReady && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="app-content"
            >
              {showDashboard ? (
                <div className="dashboard-page">
                  <button
                    className="dashboard-back-btn btn btn-outline"
                    onClick={() => setShowDashboard(false)}
                  >
                    <ArrowLeft size={18} /> Back to Portfolio
                  </button>
                  <Dashboard />
                </div>
              ) : (
                <>
                  <motion.div variants={itemVariant}><Navbar /></motion.div>
                  <main>
                    <motion.div variants={itemVariant}><Hero /></motion.div>
                    <motion.div variants={itemVariant}><About /></motion.div>
                    <motion.div variants={itemVariant}><Skills /></motion.div>
                    <motion.div variants={itemVariant}><Projects onShowDashboard={() => setShowDashboard(true)} /></motion.div>
                    <motion.div variants={itemVariant}><Services /></motion.div>
                    <motion.div variants={itemVariant}><Contact /></motion.div>
                  </main>
                  <motion.div variants={itemVariant}><Footer /></motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}
