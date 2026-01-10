/**
 * Example usage of AICampaignFeature component
 * 
 * This file demonstrates how to use the AICampaignFeature component
 * to showcase the AI-Driven Campaign Engine feature.
 */

import AICampaignFeature from './AICampaignFeature'

export default function AICampaignFeatureExample() {
  const handleTryItClick = () => {
    console.log('Try It Now clicked')
    // Navigate to signup or campaign builder page
    // Example: router.push('/campaigns/new')
  }

  const handleLearnMoreClick = () => {
    console.log('Learn More clicked')
    // Navigate to features page or open modal
    // Example: router.push('/features/ai-campaigns')
  }

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <AICampaignFeature
        onTryItClick={handleTryItClick}
        onLearnMoreClick={handleLearnMoreClick}
      />
    </div>
  )
}