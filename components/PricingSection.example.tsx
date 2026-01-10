/**
 * Example usage of PricingSection component
 * 
 * This file demonstrates how to use the PricingSection component
 * with default pricing tiers and custom configurations.
 */

import PricingSection from './PricingSection'

export default function PricingSectionExample() {
  // Example 1: Default pricing tiers
  return <PricingSection />

  // Example 2: Request Pricing mode (when pricing is not public)
  /*
  return (
    <PricingSection
      isRequestPricing={true}
      title="Custom Pricing for Your Consultancy"
      subtitle="Contact our team to get a personalized pricing quote based on your specific needs."
      requestPricingCtaText="Request Pricing"
      onRequestPricingClick={() => {
        // Handle request pricing click
        console.log('Request pricing clicked')
        // Navigate to contact form or open modal
      }}
    />
  )
  */

  // Example 3: Custom pricing tiers
  /*
  return (
    <PricingSection
      title="Simple, Transparent Pricing"
      subtitle="Choose the plan that fits your consultancy needs. All plans include a 14-day free trial."
      tiers={[
        {
          id: 'starter',
          name: 'Starter',
          description: 'For individual freelancers',
          price: '149',
          pricePeriod: 'month',
          currency: 'AED',
          features: [
            'Up to 5 clients',
            '10 proposals per month',
            'Basic invoice generation',
            'Financial tracking',
            'Email support',
          ],
          ctaText: 'Start Free Trial',
          ctaLink: '#signup',
        },
        {
          id: 'professional',
          name: 'Professional',
          description: 'For established consultants',
          price: '399',
          pricePeriod: 'month',
          currency: 'AED',
          isPopular: true,
          features: [
            'Unlimited clients',
            'Unlimited AI-powered proposals',
            'Advanced invoice generation',
            'Comprehensive financial tracking',
            'CRM features',
            'Team collaboration',
            'Custom branding',
            'Priority support',
          ],
          ctaText: 'Start Free Trial',
          ctaLink: '#signup',
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'For agencies and teams',
          price: 'Custom',
          pricePeriod: '',
          currency: '',
          features: [
            'Everything in Professional',
            'Unlimited team members',
            'Advanced integrations',
            'Dedicated support',
            'Custom training',
            'SLA guarantee',
          ],
          ctaText: 'Contact Sales',
          ctaLink: '#contact',
        },
      ]}
      showFreeTrial={true}
      freeTrialText="All plans include 14-day free trial"
      faqLink="#pricing-faq"
      faqText="See full pricing details"
    />
  )
  */

  // Example 4: With custom CTA handlers
  /*
  const handleCtaClick = (tierId: string) => {
    console.log(`CTA clicked for tier: ${tierId}`)
    // Navigate to signup/contact based on tier
    if (tierId === 'enterprise') {
      // Navigate to contact form
      window.location.href = '#contact'
    } else {
      // Navigate to signup
      window.location.href = '#signup'
    }
  }

  return (
    <PricingSection
      tiers={[
        {
          id: 'free',
          name: 'Free',
          description: 'Perfect for getting started',
          price: '0',
          pricePeriod: 'month',
          currency: 'AED',
          features: ['Up to 3 clients', 'Basic features'],
          ctaText: 'Get Started',
          onCtaClick: () => handleCtaClick('free'),
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'For established consultants',
          price: '299',
          pricePeriod: 'month',
          currency: 'AED',
          isPopular: true,
          features: ['Unlimited clients', 'All features'],
          ctaText: 'Start Free Trial',
          onCtaClick: () => handleCtaClick('pro'),
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'For agencies',
          price: 'Custom',
          pricePeriod: '',
          currency: '',
          features: ['Everything + more'],
          ctaText: 'Contact Sales',
          onCtaClick: () => handleCtaClick('enterprise'),
        },
      ]}
    />
  )
  */
}
