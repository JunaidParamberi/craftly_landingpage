'use client'

import { Mail, Twitter, Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  companyName?: string
  tagline?: string
  sections?: FooterSection[]
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    email?: string
  }
  copyrightText?: string
  className?: string
}

const defaultSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Security', href: '#security' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Blog', href: '#blog' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Support', href: '#support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Careers', href: '#careers' },
      { label: 'Brand Guidelines', href: '/brand-guidelines' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
    ],
  },
]

const Footer: React.FC<FooterProps> = ({
  companyName = 'CraftlyAI',
  tagline = 'Empower your independent consultancy with AI-driven business management.',
  sections = defaultSections,
  socialLinks = {
    twitter: 'https://twitter.com/craftlyai',
    linkedin: 'https://linkedin.com/company/craftlyai',
    github: 'https://github.com/craftlyai',
    email: 'mailto:hello@craftlyai.com',
  },
  copyrightText = `© ${new Date().getFullYear()} CraftlyAI. All rights reserved.`,
  className = '',
}) => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
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
      }
    }
  }

  return (
    <footer
      className={`
        relative bg-[#0A0E27]
        border-t border-indigo-500/30
        py-12 md:py-16 lg:py-20
        px-4 sm:px-6 lg:px-8
        overflow-hidden
        ${className}
      `}
      role="contentinfo"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-indigo-500/5 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12 mb-10 md:mb-14">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded-lg p-1 -ml-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`${companyName} Home`}
              >
                <div className="relative w-9 h-9 md:w-10 md:h-10 flex-shrink-0">
                  <motion.img
                    src="/craftly_logo.svg"
                    alt={`${companyName} Logo`}
                    width={40}
                    height={40}
                    className="object-contain w-full h-full drop-shadow-[0_0_10px_rgba(99,102,231,0.3)]"
                    whileHover={{ 
                      filter: "drop-shadow(0 0 15px rgba(99, 102, 231, 0.5))",
                      rotate: [0, -5, 5, -5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Logo Glow Effect */}
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>
                <span className="text-white font-sans font-bold text-xl md:text-2xl tracking-tight group-hover:text-indigo-200 transition-colors duration-200">
                  {companyName}
                </span>
              </motion.a>
            </motion.div>
            <motion.p 
              className="text-slate-400 text-sm md:text-base mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {tagline}
            </motion.p>

            {/* Social Links - Enhanced */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {socialLinks.twitter && (
                <motion.a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative group
                    p-3 rounded-xl
                    text-slate-400 hover:text-white
                    bg-slate-800/60 hover:bg-indigo-600/20
                    border border-slate-700/50 hover:border-indigo-500/50
                    backdrop-blur-sm
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
                    overflow-hidden
                  "
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Follow us on Twitter"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300" aria-hidden="true" />
                  <Twitter className="relative w-5 h-5 z-10 group-hover:drop-shadow-[0_0_8px_rgba(99,102,231,0.6)]" aria-hidden="true" />
                </motion.a>
              )}
              {socialLinks.linkedin && (
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative group
                    p-3 rounded-xl
                    text-slate-400 hover:text-white
                    bg-slate-800/60 hover:bg-indigo-600/20
                    border border-slate-700/50 hover:border-indigo-500/50
                    backdrop-blur-sm
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
                    overflow-hidden
                  "
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Connect with us on LinkedIn"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300" aria-hidden="true" />
                  <Linkedin className="relative w-5 h-5 z-10 group-hover:drop-shadow-[0_0_8px_rgba(99,102,231,0.6)]" aria-hidden="true" />
                </motion.a>
              )}
              {socialLinks.github && (
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative group
                    p-3 rounded-xl
                    text-slate-400 hover:text-white
                    bg-slate-800/60 hover:bg-indigo-600/20
                    border border-slate-700/50 hover:border-indigo-500/50
                    backdrop-blur-sm
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
                    overflow-hidden
                  "
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View our GitHub"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300" aria-hidden="true" />
                  <Github className="relative w-5 h-5 z-10 group-hover:drop-shadow-[0_0_8px_rgba(99,102,231,0.6)]" aria-hidden="true" />
                </motion.a>
              )}
              {socialLinks.email && (
                <motion.a
                  href={socialLinks.email}
                  className="
                    relative group
                    p-3 rounded-xl
                    text-slate-400 hover:text-white
                    bg-slate-800/60 hover:bg-indigo-600/20
                    border border-slate-700/50 hover:border-indigo-500/50
                    backdrop-blur-sm
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
                    overflow-hidden
                  "
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send us an email"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300" aria-hidden="true" />
                  <Mail className="relative w-5 h-5 z-10 group-hover:drop-shadow-[0_0_8px_rgba(99,102,231,0.6)]" aria-hidden="true" />
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Footer Links Sections - Enhanced */}
          {sections.map((section, index) => (
            <motion.nav
              key={index}
              className="lg:col-span-1"
              aria-labelledby={`footer-heading-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <h3
                id={`footer-heading-${index}`}
                className="text-sm font-bold text-white uppercase tracking-wider mb-5 md:mb-6 relative inline-block"
              >
                {section.title}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-full" aria-hidden="true" />
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => {
                  const isRoute = link.href.startsWith('/') && !link.href.startsWith('#')
                  
                  if (isRoute) {
                    return (
                      <li key={linkIndex}>
                        <Link href={link.href} className="group relative inline-block">
                          <motion.span
                            className="
                              block
                              text-sm text-slate-400 hover:text-indigo-300
                              transition-colors duration-300
                              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded
                            "
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300 rounded-full" aria-hidden="true" />
                          </motion.span>
                        </Link>
                      </li>
                    )
                  }
                  
                  return (
                    <li key={linkIndex}>
                      <motion.a
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className="
                          group relative inline-block
                          text-sm text-slate-400 hover:text-indigo-300
                          transition-colors duration-300
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded
                        "
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300 rounded-full" aria-hidden="true" />
                      </motion.a>
                    </li>
                  )
                })}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* Bottom Bar - Enhanced */}
        <motion.div 
          className="pt-10 md:pt-12 border-t border-indigo-500/30 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" aria-hidden="true" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              className="text-sm text-slate-400 font-medium"
              whileHover={{ color: '#cbd5e1' }}
            >
              {copyrightText}
            </motion.p>
            <motion.div 
              className="flex items-center space-x-2 text-sm text-slate-500 font-medium"
              whileHover={{ color: '#94a3b8' }}
            >
              <span className="text-emerald-400 font-mono">$</span>
              <span className="font-mono">// Built for independent consultants worldwide</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
export type { FooterProps, FooterLink, FooterSection }
