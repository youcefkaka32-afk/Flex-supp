import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

/* ─────────────────────────────────────────────────────────
   PageTransition — animates on navigations BETWEEN pages
   ───────────────────────────────────────────────────────── */

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function PageTransition({ children }) {
  const location = useLocation()

  useEffect(() => {
    // Temporarily disable CSS animations/transitions that include scale
    // while the route transition is in progress to avoid perceptual zooms.
    if (typeof document === 'undefined') return
    document.body.classList.add('no-scale-animations')
    const t = setTimeout(() => {
      document.body.classList.remove('no-scale-animations')
    }, 1200)
    return () => {
      clearTimeout(t)
      document.body.classList.remove('no-scale-animations')
    }
  }, [location.pathname])
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      style={{ 
        width: '100%', 
        minHeight: '100vh',
        position: 'relative',
        willChange: 'opacity',
      }}
    >
      {children}
    </motion.div>
  )
}
