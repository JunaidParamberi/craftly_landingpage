'use client'

import { useState, useEffect } from 'react'

interface HeroSectionProps {
  headline: string
  subheadline: string
  primaryCtaText: string
  secondaryCtaText: string
  onPrimaryCtaClick?: () => void
  onSecondaryCtaClick?: () => void
  terminalCommand?: string
  terminalPrompt?: string
  terminalOutput?: TerminalOutput[]
  className?: string
}

interface TerminalOutput {
  type: 'command' | 'success' | 'info' | 'list'
  content: string | string[]
}

interface CTAButtonProps {
  variant: 'primary' | 'secondary'
  text: string
  onClick?: () => void
  ariaLabel?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subheadline,
  primaryCtaText,
  secondaryCtaText,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  terminalCommand = 'craftlyai --init --mode=independent-consultancy',
  terminalPrompt = 'craftlyai@global',
  terminalOutput = [],
  className = '',
}) => {
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < terminalCommand.length) {
        setTypedText(terminalCommand.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [terminalCommand])

  useEffect(() => {
    if (!isTypingComplete) return

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [isTypingComplete])

  return (
    <section
      className={`relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 ${className}`}
      aria-labelledby="hero-headline"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          {/* Terminal Command Display */}
          <div className="inline-block mb-6 md:mb-8 p-3 md:p-4 bg-slate-900/80 backdrop-blur-md rounded-lg border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <div className="flex items-center space-x-2 font-mono text-xs md:text-sm" role="status" aria-live="polite">
              <span className="text-emerald-400" aria-hidden="true">
                {terminalPrompt}
              </span>
              <span className="text-slate-400" aria-hidden="true">:</span>
              <span className="text-slate-300" aria-hidden="true">~</span>
              <span className="text-slate-400" aria-hidden="true">$</span>
              <span className="text-white">
                {typedText}
                <span className="sr-only">Typing command</span>
              </span>
              {showCursor && isTypingComplete && (
                <span className="text-emerald-400 animate-pulse" aria-hidden="true">
                  █
                </span>
              )}
            </div>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-headline"
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent tracking-tight leading-[1.1]"
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-400 mb-6 md:mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mt-8 md:mt-12">
            <CTAButton
              variant="primary"
              text={primaryCtaText}
              onClick={onPrimaryCtaClick}
              ariaLabel="Get started with CraftlyAI"
            />
            <CTAButton
              variant="secondary"
              text={secondaryCtaText}
              onClick={onSecondaryCtaClick}
              ariaLabel="View CraftlyAI demo"
            />
          </div>
        </div>

        {/* Terminal Preview Window */}
        {terminalOutput.length > 0 && (
          <div
            className="mt-12 md:mt-20 bg-slate-900/80 backdrop-blur-md rounded-xl border border-indigo-500/20 p-4 md:p-6 lg:p-8 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            role="region"
            aria-label="Terminal preview"
          >
            {/* Terminal Header */}
            <div className="flex items-center space-x-2 mb-4 md:mb-6" aria-hidden="true">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
              <span className="ml-3 md:ml-4 text-slate-500 font-mono text-xs md:text-sm">
                craftlyai-terminal
              </span>
            </div>

            {/* Terminal Content */}
            <div className="font-mono text-xs md:text-sm space-y-2">
              {terminalOutput.map((output, index) => (
                <TerminalLine key={index} output={output} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const TerminalLine: React.FC<{ output: TerminalOutput }> = ({ output }) => {
  switch (output.type) {
    case 'command':
      return (
        <div className="flex items-center space-x-2">
          <span className="text-emerald-400" aria-hidden="true">$</span>
          <span className="text-white">{output.content as string}</span>
        </div>
      )
    case 'success':
      return (
        <div className="text-emerald-400 pl-4">
          ✓ {output.content as string}
        </div>
      )
    case 'info':
      return (
        <div className="text-blue-400 pl-4">
          → {output.content as string}
        </div>
      )
    case 'list':
      return (
        <div className="text-slate-400 pl-4 space-y-1 mt-2">
          {(output.content as string[]).map((item, index) => (
            <div key={index}>→ {item}</div>
          ))}
        </div>
      )
    default:
      return null
  }
}

const CTAButton: React.FC<CTAButtonProps> = ({
  variant,
  text,
  onClick,
  ariaLabel,
}) => {
  const baseClasses =
    'px-6 md:px-8 py-3 md:py-4 rounded-xl font-black uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed'

  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        aria-label={ariaLabel || text}
        className={`${baseClasses} bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transform hover:scale-105 active:scale-100`}
      >
        {text}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || text}
      className={`${baseClasses} border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400 active:scale-100`}
    >
      {text}
    </button>
  )
}

export default HeroSection
export type { HeroSectionProps, TerminalOutput }
