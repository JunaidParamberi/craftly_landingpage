'use client'

import Navigation from '@/components/Navigation'
import HeroSectionSplit from '@/components/HeroSectionSplit'
import AICampaignFeature from '@/components/AICampaignFeature'
import FeaturesSection from '@/components/FeaturesSection'
import SocialProofSection from '@/components/SocialProofSection'
import PricingSection from '@/components/PricingSection'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  const handleGetStarted = () => {
    // Handle get started action
    // Navigate to signup page or open modal
    // Example: router.push('/signup')
    // Example: window.location.href = '#signup'
    window.location.href = '#signup'
  }

  const handleStartFreeTrial = () => {
    // Handle start free trial action
    // Navigate to signup page
    // Example: router.push('/signup?plan=trial')
    window.location.href = '#signup?plan=trial'
  }

  const handleWatchDemo = () => {
    // Handle watch demo action
    // Open video modal or navigate to demo page
    // Example: setVideoModalOpen(true)
    window.location.href = '#demo'
  }

  const handleContactSales = () => {
    // Handle contact sales action
    // Navigate to contact form or open modal
    // Example: router.push('/contact?type=sales')
    window.location.href = '#contact?type=sales'
  }

  return (
    <main className="min-h-screen bg-[#0A0E27] text-gray-100 antialiased overflow-x-hidden">
      {/* Navigation Header */}
      <Navigation onGetStartedClick={handleGetStarted} />

      {/* Hero Section */}
      <HeroSectionSplit
        headline="Automate Your Consultancy Operations with AI"
        subheadline="Streamline your freelance business with AI-powered proposal automation, client management, and financial tracking designed for independent consultants worldwide."
        primaryCtaText="Start Free Trial"
        secondaryCtaText="Watch Demo"
        onPrimaryCtaClick={handleStartFreeTrial}
        onSecondaryCtaClick={handleWatchDemo}
        trustIndicators={['No credit card required', '14-day free trial']}
      />

      {/* AI Campaign Engine - Special Highlighted Feature */}
      <AICampaignFeature
        onTryItClick={handleStartFreeTrial}
        onLearnMoreClick={handleWatchDemo}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* Pricing Section */}
      <PricingSection
        onRequestPricingClick={handleContactSales}
      />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <CTASection
        headline="Ready to Transform Your Consultancy?"
        supportingText="Join independent consultants worldwide who are scaling their business with AI-powered management tools. Get started in minutes and experience the difference."
        ctaText="Start Your Free Trial"
        onCtaClick={handleStartFreeTrial}
        trustIndicators={['No credit card required', 'Setup in 2 minutes']}
        socialProofNumber="500+"
        socialProofText="freelancers already using CraftlyAI"
      />

      {/* Footer */}
      <Footer />
    </main>
  )
}
