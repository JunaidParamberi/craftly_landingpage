'use client'

import {
  Megaphone,
  Mail,
  MessageSquare,
  Image,
  FileText,
  Palette,
  Zap,
  ArrowRight,
  Sparkles,
  Globe,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface AICampaignFeatureProps {
  onLearnMoreClick?: () => void
  onTryItClick?: () => void
  className?: string
}

const AICampaignFeature: React.FC<AICampaignFeatureProps> = ({
  onLearnMoreClick,
  onTryItClick,
  className = '',
}) => {
  const capabilities = [
    {
      icon: Megaphone,
      title: 'Bulk Campaign Distribution',
      description: 'Send campaigns across email, WhatsApp, SMS, and social media all from one platform',
      gradient: 'from-indigo-500/20 to-blue-500/20',
      iconGradient: 'from-indigo-500 to-blue-500',
      borderColor: 'border-indigo-500/30',
    },
    {
      icon: Image,
      title: 'AI-Generated Visuals',
      description: 'Create stunning ad designs and images with AI that match your brand aesthetic',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconGradient: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
    },
    {
      icon: FileText,
      title: 'AI Content Generation',
      description: 'Automatically generate compelling email content, ad copy, and messaging that converts',
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconGradient: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-500/30',
    },
    {
      icon: Palette,
      title: 'Customizable Branding',
      description: 'Apply your brand colors, fonts, logos, and style across all campaign materials',
      gradient: 'from-violet-500/20 to-purple-500/20',
      iconGradient: 'from-violet-500 to-purple-500',
      borderColor: 'border-violet-500/30',
    },
  ]

  return (
    <section
      id="ai-campaign-engine"
      className={`relative py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0E27] ${className}`}
      aria-labelledby="ai-campaign-title"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-purple-900/10" aria-hidden="true" />
      
      {/* Floating Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] animate-pulse-slow" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] animate-pulse-slow" 
        style={{ animationDelay: '2s' }}
        aria-hidden="true" 
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,231,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,231,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Badge */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-medium tracking-wide text-indigo-300 uppercase">
              AI-Powered
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            {/* Icon centered above title */}
            <motion.div 
              className="flex justify-center mb-4 md:mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-xl" />
                <div className="relative p-4 sm:p-5 md:p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-xl">
                  <Zap 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-indigo-400" 
                    strokeWidth={2}
                    fill="currentColor"
                    fillOpacity={0.2}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Title */}
            <motion.h2
              id="ai-campaign-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              AI-Driven Campaign Engine
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4 px-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Launch powerful marketing campaigns with AI-generated content, designs, and automated distribution
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Generate professional ad campaigns in minutes, not days. AI creates your visuals, writes your content, and delivers across all channels—all with your custom branding.
            </motion.p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 md:mb-16">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon
              return (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Card */}
                  <div className={`
                    relative h-full p-5 sm:p-6 md:p-8
                    bg-slate-900/40 backdrop-blur-xl
                    border ${capability.borderColor} rounded-2xl
                    transition-all duration-300
                    group-hover:border-opacity-60 group-hover:shadow-xl group-hover:shadow-indigo-500/10
                  `}>
                    {/* Gradient Overlay on Hover */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${capability.gradient} 
                      opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 rounded-2xl
                      pointer-events-none
                    `} aria-hidden="true" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-start gap-4 md:gap-5">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`
                          relative p-3 sm:p-4 rounded-xl
                          bg-gradient-to-br ${capability.iconGradient}
                          opacity-80 group-hover:opacity-100
                          transition-all duration-300
                          group-hover:scale-110 group-hover:rotate-3
                        `}>
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
                          {capability.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <motion.div
                      className="absolute bottom-6 right-6 text-indigo-400/0 group-hover:text-indigo-400 transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Channel Integration */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-center text-lg font-semibold text-slate-200 mb-8">
              Launch campaigns across all channels
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Mail, label: 'Email', gradient: 'from-indigo-500 to-blue-500' },
                { icon: MessageSquare, label: 'WhatsApp', gradient: 'from-green-500 to-emerald-500' },
                { icon: Globe, label: 'SMS', gradient: 'from-blue-500 to-cyan-500' },
                { icon: Megaphone, label: 'Social Media', gradient: 'from-purple-500 to-pink-500' },
              ].map((channel, index) => {
                const IconComponent = channel.icon
                return (
                  <motion.div
                    key={index}
                    className="group flex flex-col items-center gap-3 p-6 bg-slate-900/40 backdrop-blur-sm border border-indigo-500/20 rounded-xl hover:border-indigo-500/40 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${channel.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
                      {channel.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={onTryItClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="
                group relative overflow-hidden
                px-8 py-3.5
                bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
                text-white font-semibold text-base
                rounded-xl
                transition-all duration-300
                shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40
                focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
                flex items-center gap-2
                min-w-[180px] justify-center
              "
              aria-label="Try AI Campaign Engine"
            >
              <span>Try It Now</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </motion.button>
            
            {onLearnMoreClick && (
              <motion.button
                onClick={onLearnMoreClick}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="
                  px-8 py-3.5
                  bg-slate-800/60 backdrop-blur-sm
                  border border-indigo-500/40 hover:border-indigo-400/60
                  text-indigo-300 hover:text-indigo-200 font-semibold text-base
                  rounded-xl
                  transition-all duration-300
                  hover:bg-slate-800/80
                  hover:shadow-lg hover:shadow-indigo-500/20
                  focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#0A0E27]
                  min-w-[180px] justify-center
                  flex items-center gap-2
                "
                aria-label="Learn more about AI Campaign Engine"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={2.5} />
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AICampaignFeature
export type { AICampaignFeatureProps }