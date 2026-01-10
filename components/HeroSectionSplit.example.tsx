/**
 * Example usage of HeroSectionSplit component
 * 
 * This file demonstrates how to use the HeroSectionSplit component
 * with default content and custom illustrations.
 */

import HeroSectionSplit from './HeroSectionSplit'
import Image from 'next/image'

export default function HeroSectionSplitExample() {
  const handleStartFreeTrial = () => {
    console.log('Start Free Trial clicked')
    // Navigate to signup page or open signup modal
    // Example: router.push('/signup')
    // Example: setSignupModalOpen(true)
  }

  const handleWatchDemo = () => {
    console.log('Watch Demo clicked')
    // Open video modal or navigate to demo page
    // Example: setVideoModalOpen(true)
    // Example: router.push('/demo')
  }

  // Example with default illustration
  return (
    <HeroSectionSplit
      headline="AUTOMATE YOUR CONSULTANCY OPERATIONS WITH AI"
      subheadline="Streamline your UAE freelance business with AI-powered proposal automation, client management, and financial tracking designed for independent consultants."
      primaryCtaText="Start Free Trial"
      secondaryCtaText="Watch Demo"
      onPrimaryCtaClick={handleStartFreeTrial}
      onSecondaryCtaClick={handleWatchDemo}
      trustIndicators={['No credit card required', '14-day free trial']}
    />
  )

  // Example with custom illustration (Next.js Image component)
  /*
  return (
    <HeroSectionSplit
      headline="AUTOMATE YOUR CONSULTANCY OPERATIONS WITH AI"
      subheadline="Streamline your UAE freelance business with AI-powered proposal automation, client management, and financial tracking designed for independent consultants."
      primaryCtaText="Start Free Trial"
      secondaryCtaText="Watch Demo"
      onPrimaryCtaClick={handleStartFreeTrial}
      onSecondaryCtaClick={handleWatchDemo}
      trustIndicators={['No credit card required', '14-day free trial']}
      illustration={
        <div className="relative w-full aspect-square">
          <Image
            src="/hero-illustration.svg"
            alt="CraftlyAI Dashboard Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      }
    />
  )
  */

  // Example with custom SVG illustration
  /*
  return (
    <HeroSectionSplit
      headline="AUTOMATE YOUR CONSULTANCY OPERATIONS WITH AI"
      subheadline="Streamline your UAE freelance business with AI-powered proposal automation, client management, and financial tracking designed for independent consultants."
      primaryCtaText="Start Free Trial"
      secondaryCtaText="Watch Demo"
      onPrimaryCtaClick={handleStartFreeTrial}
      onSecondaryCtaClick={handleWatchDemo}
      trustIndicators={['No credit card required', '14-day free trial']}
      illustration={
        <svg
          viewBox="0 0 800 600"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="800"
            height="600"
            fill="#1e293b"
            rx="20"
          />
          <text
            x="400"
            y="300"
            textAnchor="middle"
            fill="#6366f1"
            fontSize="48"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Custom Illustration
          </text>
        </svg>
      }
    />
  )
  */
}
