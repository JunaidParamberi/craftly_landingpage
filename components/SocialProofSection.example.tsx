/**
 * Example usage of SocialProofSection component
 * 
 * This file demonstrates how to use the SocialProofSection component
 * with default content and custom configurations.
 */

import SocialProofSection from './SocialProofSection'

export default function SocialProofSectionExample() {
  // Example with default content
  return <SocialProofSection />

  // Example with custom title and statistics
  /*
  return (
    <SocialProofSection
      title="Trusted by UAE's Top Consultants"
      statistics={[
        {
          value: '750+',
          label: 'Active Users',
          description: 'Consultants and freelancers',
        },
        {
          value: '25,000+',
          label: 'Documents Created',
          description: 'Proposals and invoices',
        },
        {
          value: 'AED 10M+',
          label: 'Revenue Managed',
          description: 'Tracked and analyzed',
        },
      ]}
    />
  )
  */

  // Example with custom testimonials
  /*
  return (
    <SocialProofSection
      testimonials={[
        {
          id: '1',
          rating: 5,
          quote:
            'CraftlyAI has completely streamlined my consultancy operations. The AI proposal feature is incredible!',
          name: 'John Doe',
          title: 'Strategy Consultant',
          location: 'Dubai',
          avatar: '/avatars/john-doe.jpg', // Optional: custom avatar image
        },
        {
          id: '2',
          rating: 5,
          quote:
            'Best platform for independent consultants in the UAE. Highly recommend!',
          name: 'Jane Smith',
          title: 'Marketing Consultant',
          location: 'Abu Dhabi',
        },
        // Add more testimonials as needed
      ]}
    />
  )
  */

  // Example with all custom props
  /*
  return (
    <SocialProofSection
      title="Trusted by Independent Consultants"
      statistics={[
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
          value: 'AED 5M+',
          label: 'Tracked',
          description: 'Revenue tracked through the platform',
        },
      ]}
      testimonials={[
        {
          id: '1',
          rating: 5,
          quote:
            'CraftlyAI has transformed how I manage my consultancy. The AI-powered proposal generation saves me hours every week.',
          name: 'Ahmed Al-Mansoori',
          title: 'Independent Consultant',
          location: 'Dubai',
        },
        {
          id: '2',
          rating: 5,
          quote:
            'As a freelancer in the UAE, I needed a platform that understands local business needs. CraftlyAI delivers exactly that.',
          name: 'Sarah Al-Zahra',
          title: 'Marketing Consultant',
          location: 'Abu Dhabi',
        },
        {
          id: '3',
          rating: 5,
          quote:
            'The team collaboration features are excellent. I can now easily coordinate with subcontractors from one platform.',
          name: 'Mohammed Hassan',
          title: 'Business Strategy Consultant',
          location: 'Sharjah',
        },
        {
          id: '4',
          rating: 5,
          quote:
            'Financial tracking was always a challenge. With CraftlyAI, I have real-time insights into revenue and expenses.',
          name: 'Fatima Al-Rashid',
          title: 'IT Consulting',
          location: 'Dubai',
        },
      ]}
      className="my-custom-class"
    />
  )
  */
}
