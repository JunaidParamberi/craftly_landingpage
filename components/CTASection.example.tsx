/**
 * Example usage of CTASection component
 * 
 * This file demonstrates how to use the CTASection component
 * with different variants and customizations.
 */

import CTASection from './CTASection'

export default function CTASectionExample() {
  // Example 1: Default gradient variant
  return <CTASection />

  // Example 2: Custom content
  /*
  return (
    <CTASection
      headline="Ready to Transform Your Consultancy?"
      supportingText="Join UAE's independent consultants who are scaling their business with AI-powered management tools. Get started in minutes and experience the difference."
      ctaText="Start Your Free Trial"
      trustIndicators={['No credit card required', 'Setup in 2 minutes']}
      socialProofNumber="500+"
      socialProofText="freelancers already using CraftlyAI"
      onCtaClick={() => {
        console.log('CTA clicked')
        // Navigate to signup or trigger modal
      }}
    />
  )
  */

  // Example 3: Solid background variant
  /*
  return (
    <CTASection
      variant="solid"
      headline="Start Your Free Trial Today"
      supportingText="Experience the power of AI-driven business management for independent consultants."
      ctaText="Get Started"
      trustIndicators={['No credit card required', '14-day free trial']}
    />
  )
  */

  // Example 4: Minimal variant
  /*
  return (
    <CTASection
      variant="minimal"
      headline="Ready to Get Started?"
      supportingText="Join hundreds of UAE freelancers using CraftlyAI to manage their consultancy."
      ctaText="Start Free Trial"
      trustIndicators={['No credit card required', 'Setup in 2 minutes']}
    />
  )
  */

  // Example 5: Without social proof
  /*
  return (
    <CTASection
      headline="Transform Your Consultancy Today"
      supportingText="Get started with CraftlyAI and experience the difference AI-powered management can make."
      ctaText="Start Your Free Trial"
      trustIndicators={['No credit card required', 'Setup in 2 minutes', '14-day free trial']}
      socialProofNumber={undefined}
      socialProofText={undefined}
    />
  )
  */

  // Example 6: Custom trust indicators
  /*
  return (
    <CTASection
      headline="Ready to Transform Your Consultancy?"
      supportingText="Join UAE's independent consultants who are scaling their business with AI-powered management tools."
      ctaText="Start Your Free Trial"
      trustIndicators={[
        'No credit card required',
        'Setup in 2 minutes',
        '14-day free trial',
        'Cancel anytime',
      ]}
      socialProofNumber="750+"
      socialProofText="consultants trust CraftlyAI"
      onCtaClick={() => {
        // Handle CTA click
        window.location.href = '#signup'
      }}
    />
  )
  */
}
