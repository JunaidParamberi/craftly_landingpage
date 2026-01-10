'use client'

import {
  Sparkles,
  Users,
  TrendingUp,
  FileText,
  UsersRound,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  learnMoreLink?: string
  learnMoreText?: string
}

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
  features?: Feature[]
  className?: string
}

const defaultFeatures: Feature[] = [
  {
    icon: <Sparkles size={32} strokeWidth={2} />,
    title: 'AI-Powered Proposals',
    description:
      'Generate professional proposals in minutes. AI analyzes client requirements and crafts compelling business cases tailored to your consultancy expertise.',
    learnMoreLink: '#proposals',
    learnMoreText: 'Learn more',
  },
  {
    icon: <Users size={32} strokeWidth={2} />,
    title: 'Client Management',
    description:
      'Comprehensive CRM for tracking relationships, communications, and project timelines. Never lose context with centralized client interaction history.',
    learnMoreLink: '#clients',
    learnMoreText: 'Learn more',
  },
  {
    icon: <TrendingUp size={32} strokeWidth={2} />,
    title: 'Financial Tracking',
    description:
      'Invoices, expenses, and revenue analytics in one place. Track profitability by project with tax-compliant reporting and real-time financial dashboards.',
    learnMoreLink: '#finances',
    learnMoreText: 'Learn more',
  },
  {
    icon: <FileText size={32} strokeWidth={2} />,
    title: 'Professional Documents',
    description:
      'Branded PDFs for invoices and proposals. Create polished, professional documents with custom branding that reflects your consultancy identity.',
    learnMoreLink: '#documents',
    learnMoreText: 'Learn more',
  },
  {
    icon: <UsersRound size={32} strokeWidth={2} />,
    title: 'Team Collaboration',
    description:
      'Multi-user support for agencies. Coordinate with subcontractors and team members through shared workspaces, task management, and seamless communication tools.',
    learnMoreLink: '#collaboration',
    learnMoreText: 'Learn more',
  },
]

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title = 'Platform Capabilities',
  subtitle = 'Empower your independent consultancy with AI-driven business management tools designed for freelancers and consultants worldwide.',
  features = defaultFeatures,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <section
      id="features"
      className={`pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-[#0A0E27] relative overflow-hidden ${className}`}
      aria-labelledby="features-section-title"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-purple-900/10" aria-hidden="true" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
      
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal Label */}
          <motion.div 
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-indigo-300 font-mono">
              Features
            </span>
          </motion.div>

          <motion.h2
            id="features-section-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-100 to-purple-200 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base text-slate-400/90 max-w-2xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`${index === 4 ? 'md:col-span-2 lg:col-span-2 lg:col-start-2' : ''} h-full`}
              variants={itemVariants}
            >
              <FeatureCardWithLink
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                learnMoreLink={feature.learnMoreLink}
                learnMoreText={feature.learnMoreText}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced Feature Card with Learn More Link
interface FeatureCardWithLinkProps {
  icon: React.ReactNode
  title: string
  description: string
  learnMoreLink?: string
  learnMoreText?: string
}

const FeatureCardWithLink: React.FC<FeatureCardWithLinkProps> = ({
  icon,
  title,
  description,
  learnMoreLink,
  learnMoreText = 'Learn more',
}) => {
  return (
    <motion.article
      className="
        group relative overflow-hidden
        bg-slate-900/60 backdrop-blur-xl
        border border-indigo-500/30
        rounded-xl
        p-5 md:p-6
        transition-all duration-300
        hover:border-indigo-400/50
        hover:shadow-xl hover:shadow-indigo-500/20
        focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-400 focus-within:ring-offset-2 focus-within:ring-offset-[#0A0E27]
        h-full flex flex-col
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/0 before:via-indigo-500/5 before:to-purple-500/0
        before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
      "
      role="article"
      aria-labelledby={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon Container */}
      <motion.div
        className="relative mb-4 z-10"
        aria-hidden="true"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-lg group-hover:bg-indigo-500/30 transition-all duration-300" />
          <div className="relative text-indigo-400 transition-all duration-300 group-hover:text-indigo-300 [&_svg]:w-8 [&_svg]:h-8 [&_svg]:stroke-indigo-400 [&_svg]:stroke-2">
            {icon}
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <h3
        id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-lg md:text-xl font-bold mb-3 text-slate-100 leading-tight z-10 relative group-hover:text-white transition-colors duration-200"
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-4 flex-1 z-10 relative group-hover:text-slate-300 transition-colors duration-200">
        {description}
      </p>

      {/* Learn More Link */}
      {learnMoreLink && (
        <motion.a
          href={learnMoreLink}
          className="
            mt-auto pt-3 border-t border-indigo-500/20 group-hover:border-indigo-400/40
            inline-flex items-center space-x-1.5
            text-xs md:text-sm font-medium
            text-indigo-400 hover:text-indigo-300
            transition-all duration-200
            group/link z-10 relative
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded
            w-fit
          "
          aria-label={`Learn more about ${title}`}
          whileHover={{ x: 2 }}
        >
          <span className="lowercase">{learnMoreText}</span>
          <motion.div whileHover={{ x: 4 }}>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-200"
              aria-hidden="true"
            />
          </motion.div>
        </motion.a>
      )}
    </motion.article>
  )
}

export default FeaturesSection
export type { FeaturesSectionProps, Feature }
