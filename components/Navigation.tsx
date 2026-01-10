'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
  onGetStartedClick?: () => void
  className?: string
}

interface NavLink {
  label: string
  href: string
  id: string
}

const navLinks: NavLink[] = [
  { label: 'How It Works', href: '#ai-campaign-engine', id: 'ai-campaign-engine' },
  { label: 'Features', href: '#features', id: 'features' },
  { label: 'Pricing', href: '#pricing', id: 'pricing' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
]

const Navigation: React.FC<NavigationProps> = ({
  onGetStartedClick,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Handle scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.id)
      const currentSection = sections.find((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(currentSection || '')
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change or outside click
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Handle smooth scroll with offset for sticky header
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Close mobile menu after navigation
      setIsMobileMenuOpen(false)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            isScrolled
              ? 'bg-slate-900/80 backdrop-blur-lg border-b border-indigo-500/20 shadow-lg'
              : 'bg-transparent border-b border-transparent'
          }
          ${className}
        `}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2.5 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center space-x-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg px-2 py-1 -ml-2 group transition-transform duration-200 hover:scale-105 active:scale-100"
                aria-label="CraftlyAI Home"
              >
                <div className="relative w-8 h-8 md:w-9 md:h-9 flex-shrink-0">
                  <img
                    src="/craftly_logo.svg"
                    alt="CraftlyAI Logo"
                    width={36}
                    height={36}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-white font-sans font-semibold text-base md:text-lg tracking-tight group-hover:text-indigo-200 transition-colors duration-200">
                  CraftlyAI
                </span>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative px-4 py-2 text-sm font-medium
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md
                    ${
                      activeSection === link.id
                        ? 'text-indigo-300'
                        : 'text-slate-400 hover:text-slate-200'
                    }
                  `}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full"
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <motion.div 
              className="hidden md:flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.a
                href="https://beta.craftlyai.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="
                  text-slate-300 hover:text-white
                  px-4 py-2 rounded-lg text-xs font-medium
                  transition-colors duration-200
                  hover:bg-slate-800/40
                  focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 focus:ring-offset-slate-900
                "
                aria-label="Open Beta App"
              >
                Beta
              </motion.a>
              <motion.button
                onClick={onGetStartedClick}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="
                  bg-gradient-to-r from-indigo-600 to-purple-600 
                  hover:from-indigo-500 hover:to-purple-500
                  text-white
                  px-5 py-2 rounded-lg
                  font-semibold text-xs
                  transition-all duration-200
                  shadow-lg shadow-indigo-500/30
                  hover:shadow-xl hover:shadow-indigo-500/40
                  focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 focus:ring-offset-slate-900
                "
                aria-label="Get Started with CraftlyAI"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                onKeyDown={(e) => handleKeyDown(e, () => setIsMobileMenuOpen(!isMobileMenuOpen))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  p-2 rounded-lg
                  text-slate-300 hover:text-white
                  hover:bg-slate-800/40
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
                "
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Slide-in Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="
              fixed top-0 right-0 bottom-0 z-50
              w-72 max-w-[85vw]
              bg-slate-900 dark:bg-[#0A0E27]
              border-l border-indigo-500/20
              shadow-2xl
              md:hidden
            "
            role="complementary"
            aria-label="Mobile navigation menu"
          >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-indigo-500/20">
            <div className="flex items-center space-x-2.5">
              <div className="relative w-7 h-7 flex-shrink-0">
                <img
                  src="/craftly_logo.svg"
                  alt="CraftlyAI Logo"
                  width={28}
                  height={28}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-white font-sans font-semibold text-base">
                CraftlyAI
              </span>
            </div>
            <motion.button
              onClick={() => setIsMobileMenuOpen(false)}
              onKeyDown={(e) => handleKeyDown(e, () => setIsMobileMenuOpen(false))}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="
                p-2 rounded-lg
                text-slate-300 hover:text-white
                hover:bg-slate-800/40
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
              "
              aria-label="Close menu"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </motion.button>
          </div>

          {/* Mobile Menu Links */}
          <nav
            className="flex-1 px-4 py-4 space-y-1 overflow-y-auto"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSmoothScroll(e as any, link.href)
                  }
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative block px-4 py-3 rounded-lg
                  text-sm font-medium
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
                  ${
                    activeSection === link.id
                      ? 'text-indigo-300 bg-indigo-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }
                `}
                aria-current={activeSection === link.id ? 'page' : undefined}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400 rounded-r-full"
                    layoutId="mobileActiveTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Footer CTA */}
          <div className="p-4 border-t border-indigo-500/20 space-y-2">
            <motion.a
              href="https://beta.craftlyai.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="
                block w-full text-center
                text-indigo-300 hover:text-indigo-200
                px-4 py-2.5 rounded-lg
                font-medium text-sm
                transition-colors duration-200
                hover:bg-slate-800/40
                focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 focus:ring-offset-slate-900
              "
              aria-label="Open Beta App"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Open Beta App →
            </motion.a>
            <motion.button
              onClick={() => {
                if (onGetStartedClick) {
                  onGetStartedClick()
                }
                setIsMobileMenuOpen(false)
              }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="
                w-full
                bg-gradient-to-r from-indigo-600 to-purple-600 
                hover:from-indigo-500 hover:to-purple-500
                text-white
                px-4 py-2.5 rounded-lg
                font-semibold text-sm
                transition-all duration-200
                shadow-lg shadow-indigo-500/30
                hover:shadow-xl hover:shadow-indigo-500/40
                focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 focus:ring-offset-slate-900
              "
              aria-label="Get Started with CraftlyAI"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              Get Started
            </motion.button>
          </div>
          </div>
        </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
export type { NavigationProps, NavLink }
