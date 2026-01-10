/**
 * Example usage of FeaturesSection component
 * 
 * This file demonstrates how to use the FeaturesSection component
 * with default features and custom configurations.
 */

import FeaturesSection from './FeaturesSection'
import { Sparkles, Users, TrendingUp, FileText, UsersRound } from 'lucide-react'

export default function FeaturesSectionExample() {
  // Example with default features
  return <FeaturesSection />

  // Example with custom title and subtitle
  /*
  return (
    <FeaturesSection
      title="Key Features"
      subtitle="Everything you need to run your independent consultancy efficiently."
    />
  )
  */

  // Example with custom features
  /*
  return (
    <FeaturesSection
      title="Platform Capabilities"
      subtitle="Empower your independent consultancy with AI-driven business management tools."
      features={[
        {
          icon: <Sparkles size={32} strokeWidth={2} />,
          title: 'AI-Powered Proposals',
          description:
            'Generate professional proposals in minutes. AI analyzes client requirements and crafts compelling business cases.',
          learnMoreLink: '/features/proposals',
          learnMoreText: 'Learn more',
        },
        {
          icon: <Users size={32} strokeWidth={2} />,
          title: 'Client Management',
          description:
            'Comprehensive CRM for tracking relationships, communications, and project timelines.',
          learnMoreLink: '/features/clients',
        },
        {
          icon: <TrendingUp size={32} strokeWidth={2} />,
          title: 'Financial Tracking',
          description:
            'Invoices, expenses, and revenue analytics in one place. Track profitability by project.',
        },
        {
          icon: <FileText size={32} strokeWidth={2} />,
          title: 'Professional Documents',
          description:
            'Branded PDFs for invoices and proposals. Create polished, professional documents.',
          learnMoreLink: '/features/documents',
        },
        {
          icon: <UsersRound size={32} strokeWidth={2} />,
          title: 'Team Collaboration',
          description:
            'Multi-user support for agencies. Coordinate with subcontractors and team members.',
          learnMoreLink: '/features/collaboration',
        },
      ]}
    />
  )
  */
}
