'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

interface Testimonial {
  id: string
  rating: number
  quote: string
  name: string
  title: string
  location: string
  avatar?: string
}

interface Statistic {
  value: string
  label: string
  description?: string
}

interface SocialProofSectionProps {
  title?: string
  statistics?: Statistic[]
  testimonials?: Testimonial[]
  className?: string
}

const defaultStatistics: Statistic[] = [
  {
    value: '500+',
    label: 'Freelancers',
    description: 'Independent consultants using CraftlyAI',
  },
  {
    value: '10,000+',
    label: 'Invoices Generated',
    description: 'Professional invoices created',
  },
  {
    value: '$5M+',
    label: 'Tracked',
    description: 'Revenue tracked through the platform',
  },
]

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    rating: 5,
    quote:
      'CraftlyAI has transformed how I manage my consultancy. The AI-powered proposal generation saves me hours every week, and the financial tracking gives me complete visibility into my business performance.',
    name: 'Ahmed Hassan',
    title: 'Independent Consultant',
    location: 'London, UK',
  },
  {
    id: '2',
    rating: 5,
    quote:
      'As a freelancer, I needed a platform that understands business needs across different markets. CraftlyAI delivers exactly that with tax-compliant invoicing and comprehensive client management tools.',
    name: 'Sarah Martinez',
    title: 'Marketing Consultant',
    location: 'New York, USA',
  },
  {
    id: '3',
    rating: 5,
    quote:
      'The team collaboration features are excellent. I can now easily coordinate with subcontractors and share project updates with clients, all from one centralized platform.',
    name: 'Michael Chen',
    title: 'Business Strategy Consultant',
    location: 'Singapore',
  },
  {
    id: '4',
    rating: 5,
    quote:
      'Financial tracking was always a challenge for my consultancy. With CraftlyAI, I have real-time insights into revenue, expenses, and profitability by project. It\'s a game-changer.',
    name: 'Emma Thompson',
    title: 'IT Consulting',
    location: 'Toronto, Canada',
  },
]

const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  title = 'Trusted by Independent Consultants',
  statistics = defaultStatistics,
  testimonials = defaultTestimonials,
  className = '',
}) => {
  return (
    <section
      className={`py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0E27] relative overflow-hidden ${className}`}
      aria-labelledby="social-proof-title"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-purple-900/10" aria-hidden="true" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
      
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
            <Star className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-indigo-300 font-mono">
              Social Proof
            </span>
          </motion.div>

          <motion.h2
            id="social-proof-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Statistics Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className="
                group relative overflow-hidden
                text-center
                p-5 md:p-6
                bg-slate-900/60 backdrop-blur-xl
                border border-indigo-500/30
                rounded-xl
                transition-all duration-300
                hover:border-indigo-400/50
                hover:shadow-xl hover:shadow-indigo-500/20
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/0 before:via-indigo-500/5 before:to-purple-500/0
                before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
              "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-purple-300 group-hover:from-indigo-200 group-hover:via-white group-hover:to-purple-200 transition-all duration-300">
                {stat.value}
              </div>
              <div className="relative z-10 text-base md:text-lg font-semibold mb-1 text-slate-200 group-hover:text-white transition-colors">
                {stat.label}
              </div>
              {stat.description && (
                <div className="relative z-10 text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <TestimonialCard
                testimonial={testimonial}
                isAlternate={index % 2 === 1}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Testimonial Card Component
interface TestimonialCardProps {
  testimonial: Testimonial
  isAlternate: boolean
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  isAlternate,
}) => {
  return (
    <motion.article
      className={`
        group relative overflow-hidden
        p-5 md:p-6
        bg-slate-900/60 backdrop-blur-xl
        border border-indigo-500/30
        rounded-xl
        transition-all duration-300
        hover:border-indigo-400/50
        hover:shadow-xl hover:shadow-indigo-500/20
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/0 before:via-indigo-500/5 before:to-purple-500/0
        before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
        ${isAlternate ? 'lg:mt-6' : ''}
      `}
      role="article"
      aria-labelledby={`testimonial-${testimonial.id}`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity z-10">
        <Quote className="w-10 h-10 md:w-12 md:h-12 text-indigo-400" aria-hidden="true" />
      </div>

      {/* Star Rating */}
      <div className="flex items-center space-x-0.5 mb-3 relative z-10" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Star
              className={`
                w-4 h-4 transition-all duration-200
                ${
                  i < testimonial.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-slate-600'
                }
              `}
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>

      {/* Quote Text */}
      <blockquote className="mb-4 relative z-10">
        <p
          id={`testimonial-${testimonial.id}`}
          className="text-sm md:text-base text-slate-300 leading-relaxed italic group-hover:text-slate-200 transition-colors"
        >
          "{testimonial.quote}"
        </p>
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <motion.div
          className="
            w-10 h-10 md:w-12 md:h-12
            rounded-full
            bg-gradient-to-br from-indigo-400 to-indigo-600
            flex items-center justify-center
            flex-shrink-0
            text-white font-bold text-base md:text-lg
            shadow-md shadow-indigo-500/30
          "
          aria-hidden="true"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={`${testimonial.name} avatar`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{testimonial.name.charAt(0).toUpperCase()}</span>
          )}
        </motion.div>

        {/* Author Details */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-100 text-sm md:text-base">
            {testimonial.name}
          </div>
          <div className="text-xs md:text-sm text-slate-400 truncate">
            {testimonial.title}
          </div>
          <div className="text-xs text-slate-500 truncate">
            {testimonial.location}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default SocialProofSection
export type { SocialProofSectionProps, Testimonial, Statistic }
