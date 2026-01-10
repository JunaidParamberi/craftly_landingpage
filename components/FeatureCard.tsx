'use client'

import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <article
      className={`
        group relative
        bg-white dark:bg-slate-900/80
        border border-slate-200 dark:border-indigo-500/20
        rounded-xl
        p-6 md:p-8
        transition-all duration-300
        hover:border-indigo-500 dark:hover:border-indigo-500
        hover:shadow-lg hover:shadow-indigo-500/10
        dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]
        focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2
        ${className}
      `}
      role="article"
      aria-labelledby={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Icon Container */}
      <div
        className="mb-4 text-[#6366F1] transition-transform duration-300 group-hover:scale-110 [&_svg]:w-8 [&_svg]:h-8 [&_svg]:stroke-[#6366F1] [&_svg]:stroke-2"
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100 leading-tight"
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
        {description}
      </p>
    </article>
  )
}

export default FeatureCard
export type { FeatureCardProps }
