/**
 * Example usage of HeroSection component
 * 
 * This file demonstrates how to use the HeroSection component
 * with all available props and configurations.
 */

import HeroSection, { TerminalOutput } from './HeroSection'

export default function HeroSectionExample() {
  const terminalOutput: TerminalOutput[] = [
    {
      type: 'command',
      content: 'craftlyai init --consultancy',
    },
    {
      type: 'success',
      content: 'Initializing AI-powered business management...',
    },
    {
      type: 'command',
      content: 'craftlyai features --list',
    },
    {
      type: 'list',
      content: [
        'AI-powered proposal generation',
        'Client relationship management',
        'Financial tracking & invoicing',
        'Team collaboration tools',
      ],
    },
    {
      type: 'command',
      content: 'craftlyai status',
    },
    {
      type: 'info',
      content: 'System ready. All modules operational.',
    },
  ]

  const handlePrimaryCta = () => {
    console.log('Primary CTA clicked')
    // Navigate to signup or trigger modal
  }

  const handleSecondaryCta = () => {
    console.log('Secondary CTA clicked')
    // Navigate to demo or open demo modal
  }

  return (
    <HeroSection
      headline="AUTOMATE YOUR CONSULTANCY OPERATIONS WITH AI"
      subheadline="Streamline your UAE freelance business with AI-powered proposal automation, client management, and financial tracking designed for independent consultants."
      primaryCtaText="$ npm install craftlyai"
      secondaryCtaText="$ craftlyai --demo"
      onPrimaryCtaClick={handlePrimaryCta}
      onSecondaryCtaClick={handleSecondaryCta}
      terminalCommand="craftlyai --init --mode=independent-consultancy"
      terminalPrompt="craftlyai@uae"
      terminalOutput={terminalOutput}
    />
  )
}
