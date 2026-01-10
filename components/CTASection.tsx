'use client'

import { Check, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface CTASectionProps {
  headline?: string
  supportingText?: string
  ctaText?: string
  onCtaClick?: () => void
  trustIndicators?: string[]
  socialProofNumber?: string
  socialProofText?: string
  className?: string
  variant?: 'gradient' | 'solid' | 'minimal'
}

const CTASection: React.FC<CTASectionProps> = ({
  headline = 'Ready to Transform Your Consultancy?',
  supportingText = 'Join independent consultants worldwide who are scaling their business with AI-powered management tools. Get started in minutes and experience the difference.',
  ctaText = 'Start Your Free Trial',
  onCtaClick,
  trustIndicators = ['No credit card required', 'Setup in 2 minutes'],
  socialProofNumber = '500+',
  socialProofText = 'freelancers already using CraftlyAI',
  className = '',
  variant = 'gradient',
}) => {

  return (
    <section
      className={`
        relative overflow-hidden
        py-14 md:py-18 lg:py-24
        px-4 sm:px-6 lg:px-8
        bg-[#0A0E27]
        ${className}
      `}
      aria-labelledby="cta-headline"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 animate-gradient-shift" aria-hidden="true" />
      
      {/* Background Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Animated Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-3xl mx-auto text-center z-10">
        {/* Terminal Label */}
        <motion.div 
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <Zap className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
          </motion.div>
          <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-white font-mono">
            Get Started
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="cta-headline"
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-100 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {headline}
        </motion.h2>

        {/* Supporting Text */}
        <motion.p 
          className="text-sm md:text-base mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed text-slate-300/90 font-normal"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {supportingText}
        </motion.p>

        {/* Social Proof */}
        {socialProofNumber && (
          <motion.div 
            className="mb-8 md:mb-10 inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-2xl md:text-3xl font-bold text-white">
              {socialProofNumber}
            </span>
            <span className="text-slate-200 text-sm md:text-base">
              {socialProofText}
            </span>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div 
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={onCtaClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="
              group relative overflow-hidden
              inline-flex items-center justify-center space-x-2
              bg-white hover:bg-indigo-50
              text-indigo-600 hover:text-indigo-700
              px-6 md:px-8
              py-3 md:py-3.5
              rounded-xl
              font-semibold tracking-wide
              text-sm md:text-base
              transition-all duration-200
              shadow-xl shadow-indigo-900/50
              hover:shadow-2xl hover:shadow-indigo-900/70
              focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/30 before:to-white/0
              before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
            "
            aria-label={ctaText}
          >
            <span className="relative z-10">{ctaText}</span>
            <motion.div whileHover={{ x: 4 }}>
              <ArrowRight
                className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform duration-200"
                aria-hidden="true"
              />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        {trustIndicators && trustIndicators.length > 0 && (
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-1.5 group/item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 2 }}
              >
                <Check
                  className="w-4 h-4 text-emerald-400 group-hover/item:text-emerald-300 transition-colors flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs md:text-sm text-slate-200 group-hover/item:text-white transition-colors lowercase">
                  {indicator}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Additional Trust Element */}
        <motion.div 
          className="mt-8 md:mt-10 text-xs md:text-sm text-slate-300 opacity-80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          14-day free trial • cancel anytime
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" aria-hidden="true" />
    </section>
  )
}

export default CTASection
export type { CTASectionProps }
