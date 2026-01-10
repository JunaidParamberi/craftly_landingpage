/**
 * Example usage of FeatureCard component
 * 
 * This file demonstrates how to use the FeatureCard component
 * with Lucide React icons and different configurations.
 */

import FeatureCard from './FeatureCard'
import {
  Sparkles,
  Users,
  TrendingUp,
  FileText,
  MessageSquare,
  BarChart3,
} from 'lucide-react'

export default function FeatureCardExample() {
  const features = [
    {
      icon: <Sparkles size={32} strokeWidth={2} />,
      title: 'AI-Powered Proposals',
      description:
        'Generate professional, strategic proposals in minutes. AI analyzes client requirements and crafts compelling business cases tailored to your consultancy expertise.',
    },
    {
      icon: <Users size={32} strokeWidth={2} />,
      title: 'Client Management',
      description:
        'Centralized CRM for tracking client relationships, communications, and project timelines. Never lose context with comprehensive client interaction history.',
    },
    {
      icon: <TrendingUp size={32} strokeWidth={2} />,
      title: 'Financial Tracking',
      description:
        'Real-time financial dashboard. Track revenue, expenses, profitability by project. UAE-compliant reporting and analytics for independent consultants.',
    },
    {
      icon: <FileText size={32} strokeWidth={2} />,
      title: 'Invoice Generation',
      description:
        'Automated invoice creation with custom branding. Multiple currencies, payment tracking, and automated reminders to ensure timely payments.',
    },
    {
      icon: <MessageSquare size={32} strokeWidth={2} />,
      title: 'Team Collaboration',
      description:
        'Coordinate with subcontractors and team members. Shared workspaces, task management, and communication tools for seamless project delivery.',
    },
    {
      icon: <BarChart3 size={32} strokeWidth={2} />,
      title: 'Strategic Analytics',
      description:
        'Data-driven insights into your consultancy performance. Identify growth opportunities and optimize operations with comprehensive business intelligence.',
    },
  ]

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0A0E27]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-transparent dark:bg-gradient-to-r dark:from-indigo-400 dark:to-indigo-600 dark:bg-clip-text">
            Platform Capabilities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-mono">
            // Core modules for independent consultancy operations
          </p>
        </div>

        {/* 3-column grid on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
