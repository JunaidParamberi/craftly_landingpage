'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Play, Check, Sparkles, ArrowRight, Zap } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroSectionSplitProps {
  headline?: string
  subheadline?: string
  primaryCtaText?: string
  secondaryCtaText?: string
  onPrimaryCtaClick?: () => void
  onSecondaryCtaClick?: () => void
  illustration?: ReactNode
  trustIndicators?: string[]
  className?: string
}

const HeroSectionSplit: React.FC<HeroSectionSplitProps> = ({
  headline = 'Automate Your Consultancy Operations with AI',
  subheadline = 'Streamline your freelance business with AI-powered proposal automation, client management, and financial tracking designed for independent consultants worldwide.',
  primaryCtaText = 'Start Free Trial',
  secondaryCtaText = 'Watch Demo',
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  illustration,
  trustIndicators = ['No credit card required', '14-day free trial'],
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      className={`
        relative overflow-hidden
        pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24
        px-4 sm:px-6 lg:px-8
        min-h-[85vh] sm:min-h-screen flex items-center
        bg-[#0A0E27]
        ${className}
      `}
      aria-labelledby="hero-headline"
    >
      {/* Premium gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/10 rounded-full blur-[140px]" />
      </div>
      
      {/* Subtle mesh pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Animated gradient lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-0 w-px h-96 bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"
          style={{ transform: `translateY(${mousePosition.y * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-px h-96 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
          style={{ transform: `translateY(${-mousePosition.y * 0.3}px)` }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Premium Content */}
          <motion.div 
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
          >
            
            {/* Premium Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-500/10 via-purple-500/8 to-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-full group cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/15 transition-all duration-300"
              onClick={() => window.open('https://beta.craftlyai.app/', '_blank')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div className="relative" whileHover={{ rotate: 12 }}>
                <Zap className="w-3.5 h-3.5 text-indigo-400" fill="currentColor" />
              </motion.div>
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-indigo-300/90 font-mono">
                Beta Available
              </span>
              <motion.div whileHover={{ x: 2 }}>
                <ArrowRight className="w-3 h-3 text-indigo-400/60 group-hover:text-indigo-300 transition-colors" />
              </motion.div>
            </motion.div>

            {/* Premium Headline - Refined */}
            <motion.div 
              className="space-y-2 md:space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1
                id="hero-headline"
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-white"
              >
                <motion.span 
                  className="block bg-gradient-to-br from-white via-white to-slate-100 bg-clip-text text-transparent mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Automate Your Consultancy
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Operations with AI
                </motion.span>
              </h1>
              
              {/* Subtle decorative accent */}
              <motion.div 
                className="w-12 h-0.5 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.div>

            {/* Premium Subheadline */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-slate-400/90 leading-relaxed max-w-xl font-normal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {subheadline}
            </motion.p>

            {/* Premium CTA Section */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => window.open('https://beta.craftlyai.app/', '_blank')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="
                  group relative overflow-hidden
                  bg-white text-slate-900
                  px-5 py-2.5 rounded-lg
                  font-semibold text-xs
                  transition-all duration-200
                  hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.25)]
                  focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
                  flex items-center justify-center gap-1.5
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                  before:translate-x-[-200%] group-hover:before:translate-x-[200%] before:transition-transform before:duration-700
                "
                aria-label="Start Free Trial"
              >
                <span className="relative z-10">{primaryCtaText}</span>
                <motion.div whileHover={{ x: 2 }}>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform" strokeWidth={2.5} />
                </motion.div>
              </motion.button>

              <motion.button
                onClick={onSecondaryCtaClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="
                  group relative
                  border border-slate-700/50 text-slate-300 bg-slate-900/30 backdrop-blur-sm
                  px-5 py-2.5 rounded-lg
                  font-semibold text-xs
                  transition-all duration-200
                  hover:border-slate-600/50 hover:text-white hover:bg-slate-800/50
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
                  flex items-center justify-center gap-1.5
                "
                aria-label="Watch Demo"
              >
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Play className="w-3.5 h-3.5 fill-current transition-transform" />
                </motion.div>
                <span>{secondaryCtaText}</span>
              </motion.button>
            </motion.div>

            {/* Premium Trust Indicators */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {trustIndicators.map((indicator, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-1.5 text-[10px] text-slate-500/90 group/item hover:text-slate-400 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ x: 2 }}
                >
                  <Check className="w-3 h-3 text-emerald-400 group-hover/item:text-emerald-300 transition-colors" strokeWidth={2.5} />
                  <span className="font-medium">{indicator}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Illustration */}
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
          >
            {illustration ? (
              <div className="w-full max-w-xl">{illustration}</div>
            ) : (
              <DefaultIllustration />
            )}
          </motion.div>
        </div>
      </div>

    </section>
  )
}

// Premium Illustration Component
const DefaultIllustration: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState({
    revenue: 0,
    clients: 0,
    proposals: 0,
    active: 0,
  })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let currentStep = 0
    
    const timer = setInterval(() => {
      currentStep++
      const progress = Math.min(currentStep / steps, 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      setAnimatedValues({
        revenue: Math.floor(45 * easeOutCubic),
        clients: Math.floor(12 * easeOutCubic),
        proposals: Math.floor(8 * easeOutCubic),
        active: Math.floor(5 * easeOutCubic),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedValues({ revenue: 45, clients: 12, proposals: 8, active: 5 })
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      className="relative w-full max-w-xl mx-auto group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Outer glow */}
      <motion.div 
        className="absolute -inset-3 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80"
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Main card */}
      <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/90 backdrop-blur-2xl rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-slate-600/70 group-hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.4)]">
        
        {/* Header */}
        <div className="relative flex items-center justify-between px-4 py-2.5 bg-slate-800/60 border-b border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-md shadow-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-md shadow-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-md shadow-green-500/50" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] font-medium text-slate-400 font-mono tracking-wide">craftlyai • dashboard</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
          {/* Command section */}
          <div className="font-mono text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-emerald-400">$</span>
              <span className="opacity-90">craftlyai</span>
              <span className="text-indigo-400">init</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 pl-4">
              <Check className="w-3 h-3" strokeWidth={3} />
              <span className="text-[10px]">System initialized successfully</span>
            </div>
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {[
              { label: 'Revenue', value: `$${animatedValues.revenue}K`, change: '+12%', bgClass: 'from-indigo-500/10 to-indigo-500/5', borderClass: 'border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-500/15', textClass: 'from-indigo-300 to-indigo-500', changeClass: 'text-emerald-400' },
              { label: 'Clients', value: String(animatedValues.clients), change: 'Active', bgClass: 'from-emerald-500/10 to-emerald-500/5', borderClass: 'border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/15', textClass: 'from-emerald-300 to-emerald-500', changeClass: 'text-emerald-400' },
              { label: 'Proposals', value: String(animatedValues.proposals), change: 'Pending: 2', bgClass: 'from-blue-500/10 to-blue-500/5', borderClass: 'border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/15', textClass: 'from-blue-300 to-blue-500', changeClass: 'text-indigo-400' },
              { label: 'Projects', value: String(animatedValues.active), change: 'Running', bgClass: 'from-purple-500/10 to-purple-500/5', borderClass: 'border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/15', textClass: 'from-purple-300 to-purple-500', changeClass: 'text-purple-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`group/card relative bg-gradient-to-br ${stat.bgClass} border ${stat.borderClass} rounded-lg p-3 backdrop-blur-sm transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <div className="relative">
                  <div className="text-[9px] font-medium text-slate-400 mb-1 uppercase tracking-wider">{stat.label}</div>
                  <div className={`text-lg font-bold bg-gradient-to-br ${stat.textClass} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className={`text-[8px] ${stat.changeClass} mt-0.5`}>{stat.change}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-emerald-400/80">
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroSectionSplit
export type { HeroSectionSplitProps }
