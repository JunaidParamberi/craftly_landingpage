'use client'

import { Check, Zap, Sparkles, ArrowRight, Globe, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useCurrency } from '@/hooks/useCurrency'
import { getCurrencyFromCountry } from '@/lib/currency'

interface PricingTier {
  id: string
  name: string
  description: string
  price: string
  priceAnnual?: string
  pricePeriod?: string
  currency?: string
  isPopular?: boolean
  features: string[]
  ctaText: string
  ctaLink?: string
  onCtaClick?: () => void
  popularLabel?: string
}

interface PricingSectionProps {
  title?: string
  subtitle?: string
  tiers?: PricingTier[]
  showFreeTrial?: boolean
  freeTrialText?: string
  faqLink?: string
  faqText?: string
  className?: string
  isRequestPricing?: boolean
  requestPricingCtaText?: string
  onRequestPricingClick?: () => void
}

// Base prices in AED
const defaultTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started with AI-powered tools',
    price: '0',
    priceAnnual: '0',
    pricePeriod: 'month',
    currency: 'AED', // Base currency in AED
    features: [
      'Up to 2 active clients',
      '3 AI-generated proposals per month',
      'AI-powered invoice generation',
      'Basic financial tracking',
      'AI client insights & recommendations',
      'Email support',
      'Mobile app access',
    ],
    ctaText: 'Get Started Free',
    ctaLink: '#signup',
  },
  {
    id: 'budget',
    name: 'Budget',
    description: 'Smart pricing with powerful AI capabilities',
    price: '49', // 49 AED per month
    priceAnnual: '470', // 470 AED per year (49 * 12 * 0.8 = ~470, ~20% savings)
    pricePeriod: 'month',
    currency: 'AED', // Base currency in AED
    isPopular: true,
    popularLabel: 'Most Popular',
    features: [
      'Up to 10 active clients',
      '20 AI-generated proposals per month',
      'AI content writing for proposals & emails',
      'AI-powered invoice & payment tracking',
      'Basic AI financial insights & reports',
      'AI client CRM with smart suggestions',
      'AI-generated contract templates',
      'Email & chat support',
      'Mobile app with AI features',
      'AI content templates library',
    ],
    ctaText: 'Start Free Trial',
    ctaLink: '#signup',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Full AI suite for established consultants',
    price: '150', // 150 AED per month
    priceAnnual: '1440', // 1440 AED per year (150 * 12 * 0.8 = ~1440, ~20% savings)
    pricePeriod: 'month',
    currency: 'AED', // Base currency in AED
    features: [
      'Unlimited clients',
      'Unlimited AI-generated proposals',
      'AI Campaign Engine - full marketing automation',
      'AI content generation for all communications',
      'AI-powered financial analytics & forecasting',
      'AI client insights & relationship management',
      'AI campaign creation (email, WhatsApp, SMS)',
      'AI-generated visuals & ad designs',
      'Advanced AI templates & workflows',
      'Team collaboration (up to 5 members)',
      'Custom AI branding & personalization',
      'Priority AI support & training',
      'Multi-currency AI analysis',
      'Advanced AI reporting & exports',
    ],
    ctaText: 'Start Free Trial',
    ctaLink: '#signup',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete AI platform for agencies',
    price: 'Custom',
    priceAnnual: 'Custom',
    pricePeriod: '',
    currency: '',
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Custom AI model training',
      'Advanced AI integrations & API access',
      'Dedicated AI account manager',
      'White-label AI solution',
      'Custom AI workflow automation',
      'Enterprise AI security & compliance',
      'AI infrastructure & deployment options',
      '24/7 AI priority support',
      'Custom AI SLA agreements',
      'Dedicated AI training & onboarding',
      'Quarterly AI optimization reviews',
      'On-premise AI deployment option',
    ],
    ctaText: 'Contact Sales',
    ctaLink: '#contact',
  },
]

const PricingSection: React.FC<PricingSectionProps> = ({
  title = 'Simple, Transparent Pricing',
  subtitle = 'Choose the plan that grows with your consultancy. All plans include a 14-day free trial.',
  tiers = defaultTiers,
  showFreeTrial = true,
  freeTrialText = '14-day free trial • No credit card required',
  faqLink = '#faq',
  faqText = 'View pricing FAQ',
  className = '',
  isRequestPricing = false,
  requestPricingCtaText = 'Request Pricing',
  onRequestPricingClick,
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [convertedTiers, setConvertedTiers] = useState<PricingTier[]>(tiers)
  const [showCurrencySelector, setShowCurrencySelector] = useState(false)
  const currencySelectorRef = useRef<HTMLDivElement>(null)
  const { currency, isLoading, convertAEDPrice, formatCurrency, setCurrency: setCurrencyManually } = useCurrency()
  const annualSavings = 20

  // Close currency selector when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencySelectorRef.current && !currencySelectorRef.current.contains(event.target as Node)) {
        setShowCurrencySelector(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Convert prices when currency changes
  useEffect(() => {
    async function convertPrices() {
      if (isLoading) {
        // Show base AED prices while loading
        setConvertedTiers(tiers.map(tier => ({ ...tier, currency: 'AED' })))
        return
      }

      console.log('💰 Converting prices from AED to:', currency.code)

      const converted = await Promise.all(
        tiers.map(async (tier) => {
          if (tier.price === 'Custom' || tier.price === '0') {
            return {
              ...tier,
              currency: currency.code,
            }
          }

          // Base prices are in AED - if currency is AED, don't convert
          if (currency.code === 'AED') {
            return {
              ...tier,
              price: tier.price,
              priceAnnual: tier.priceAnnual,
              currency: currency.code,
            }
          }

          // Base prices are in AED - convert to user's currency
          const basePrice = parseFloat(tier.price)
          const baseAnnualPrice = tier.priceAnnual ? parseFloat(tier.priceAnnual) : null

          const convertedPrice = await convertAEDPrice(basePrice)
          const convertedAnnualPrice = baseAnnualPrice ? await convertAEDPrice(baseAnnualPrice) : null

          console.log(`💰 Converted ${tier.name}: ${basePrice} AED → ${convertedPrice.toFixed(0)} ${currency.code}`)

          return {
            ...tier,
            price: Math.round(convertedPrice).toString(),
            priceAnnual: convertedAnnualPrice ? Math.round(convertedAnnualPrice).toString() : tier.priceAnnual,
            currency: currency.code,
          }
        })
      )

      setConvertedTiers(converted)
    }

    convertPrices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency.code, isLoading])

  if (isRequestPricing) {
    return (
      <RequestPricingSection
        title={title}
        subtitle={subtitle}
        ctaText={requestPricingCtaText}
        onCtaClick={onRequestPricingClick}
        className={className}
      />
    )
  }

  return (
    <section
      id="pricing"
      className={`relative py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0E27] overflow-hidden ${className}`}
      aria-labelledby="pricing-section-title"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-indigo-900/10" aria-hidden="true" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} aria-hidden="true" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,231,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,231,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">
              Pricing
            </span>
          </motion.div>

          <motion.h2
            id="pricing-section-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 tracking-tight px-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 px-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.p>

          {/* Free Trial Notice - On its own line */}
          {showFreeTrial && (
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-sm text-emerald-400 font-medium">
                  {freeTrialText}
                </span>
              </div>
            </motion.div>
          )}

          {/* Billing Toggle - On its own line */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 p-1 bg-slate-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-xl">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative ${
                billingPeriod === 'annual'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annual
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                -{annualSavings}%
              </span>
            </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Currency Indicator with Manual Selector */}
        <motion.div 
          className="flex flex-col items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 border border-indigo-500/20 rounded-lg">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-300">
              Prices shown in{' '}
              <span className="font-bold text-indigo-300">
                {currency.code}
                {currency.symbol && currency.symbol.trim() && ` (${currency.symbol})`}
              </span>
              {currency.code !== 'AED' && (
                <span className="text-slate-500 ml-1">
                  • Base price in AED
                </span>
              )}
            </span>
          </div>
          
          {/* Currency Selector Dropdown */}
          <div className="relative" ref={currencySelectorRef}>
            <button
              onClick={() => setShowCurrencySelector(!showCurrencySelector)}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-indigo-300 transition-colors rounded-lg hover:bg-slate-800/60"
            >
              <span>Change currency</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showCurrencySelector ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showCurrencySelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 mt-2 w-56 bg-slate-900 border border-indigo-500/30 rounded-xl shadow-xl p-3 max-h-64 overflow-y-auto"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { code: 'AE', name: 'UAE Dirham', symbol: 'AED' },
                      { code: 'US', name: 'US Dollar', symbol: 'USD' },
                      { code: 'IN', name: 'Indian Rupee', symbol: 'INR' },
                      { code: 'CN', name: 'Chinese Yuan', symbol: 'CNY' },
                      { code: 'GB', name: 'British Pound', symbol: 'GBP' },
                      { code: 'FR', name: 'Euro', symbol: 'EUR' },
                      { code: 'CA', name: 'Canadian Dollar', symbol: 'CAD' },
                      { code: 'AU', name: 'Australian Dollar', symbol: 'AUD' },
                      { code: 'SG', name: 'Singapore Dollar', symbol: 'SGD' },
                      { code: 'JP', name: 'Japanese Yen', symbol: 'JPY' },
                      { code: 'SA', name: 'Saudi Riyal', symbol: 'SAR' },
                      { code: 'KW', name: 'Kuwaiti Dinar', symbol: 'KWD' },
                      { code: 'QA', name: 'Qatari Riyal', symbol: 'QAR' },
                    ].map((curr) => {
                      const currInfo = getCurrencyFromCountry(curr.code)
                      const isSelected = currency.code === currInfo.code
                      return (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setCurrencyManually(curr.code)
                            setShowCurrencySelector(false)
                          }}
                          className={`px-2 py-1.5 text-xs rounded-lg text-left transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          {curr.symbol} - {curr.name}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Pricing Tiers - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {(isLoading ? tiers : convertedTiers).map((tier, index) => (
            <PricingCard 
              key={tier.id} 
              tier={tier} 
              index={index} 
              billingPeriod={billingPeriod}
              annualSavings={annualSavings}
              currency={currency}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>

        {/* FAQ Link */}
        {faqLink && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <a
              href={faqLink}
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 group"
            >
              <span>{faqText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Pricing Card Component
interface PricingCardProps {
  tier: PricingTier
  index: number
  billingPeriod: 'monthly' | 'annual'
  annualSavings: number
  currency: { code: string; symbol: string }
  formatCurrency: (amount: number | string, showCode?: boolean) => string
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  tier, 
  index, 
  billingPeriod, 
  annualSavings, 
  currency,
  formatCurrency 
}) => {
  const isEnterprise = tier.price === 'Custom'
  const monthlyPrice = tier.price !== 'Custom' ? parseFloat(tier.price) : 0
  
  // For annual: Calculate monthly equivalent (20% discount from monthly price)
  // Show the monthly equivalent but indicate it's billed annually
  let displayPrice: string
  let displayPeriod: string
  let originalMonthlyPrice: number | null = null
  
  if (billingPeriod === 'annual' && !isEnterprise && tier.priceAnnual) {
    // Calculate monthly equivalent from annual price
    const annualTotal = parseFloat(tier.priceAnnual)
    const monthlyEquivalent = Math.round(annualTotal / 12) // Monthly equivalent
    displayPrice = monthlyEquivalent.toString()
    displayPeriod = 'month'
    originalMonthlyPrice = monthlyPrice // Original monthly price for comparison
  } else {
    // Monthly billing or enterprise
    displayPrice = tier.price
    displayPeriod = tier.pricePeriod || 'month'
  }

  return (
    <motion.div
      className={`
        group relative
        h-full
        bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60
        backdrop-blur-xl
        border-2 rounded-2xl
        p-5 sm:p-6 md:p-8
        transition-all duration-300
        flex flex-col
        ${tier.isPopular ? 'lg:scale-105' : ''}
        ${
          tier.isPopular
            ? 'border-indigo-500/60 shadow-2xl shadow-indigo-500/20'
            : 'border-indigo-500/20 hover:border-indigo-500/40'
        }
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      {/* Popular Badge */}
      {tier.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap">
            {tier.popularLabel || 'Most Popular'}
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      {tier.isPopular && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" aria-hidden="true" />
      )}

      {/* Header - Improved Hierarchy */}
      <div className="mb-6 md:mb-8">
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-white ${tier.isPopular ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300' : ''}`}>
          {tier.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {tier.description}
        </p>
      </div>

      {/* Pricing - Improved Hierarchy */}
      <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-indigo-500/20">
        {isEnterprise ? (
          <div>
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 md:mb-3">
              {displayPrice}
            </div>
            <p className="text-sm sm:text-base text-slate-400">
              Contact us for pricing
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-2 md:mb-3">
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="text-lg sm:text-xl md:text-2xl font-medium text-slate-400">
                  {currency.symbol || currency.code}
                </span>
                <span className={`text-4xl sm:text-5xl md:text-6xl font-bold ${tier.isPopular ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300' : 'text-white'}`}>
                  {displayPrice}
                </span>
                <span className="text-base sm:text-lg text-slate-400">
                  /{displayPeriod}
                </span>
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  billed annually
                </p>
              )}
            </div>
            {billingPeriod === 'annual' && originalMonthlyPrice !== null && parseFloat(displayPrice) < originalMonthlyPrice && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-base text-slate-500 line-through">
                  {formatCurrency(originalMonthlyPrice)}/month
                </span>
                <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-semibold">
                  Save {annualSavings}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="flex-1 mb-5 md:mb-6 space-y-2.5 md:space-y-3">
        {tier.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2.5 md:gap-3">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        onClick={tier.onCtaClick}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full
          py-3 sm:py-3.5 md:py-4
          rounded-xl
          font-semibold text-xs sm:text-sm md:text-base
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
          ${
            tier.isPopular
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50'
              : isEnterprise
              ? 'border-2 border-indigo-500/60 hover:border-indigo-400 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/10'
              : 'bg-slate-800/60 hover:bg-slate-800 text-white border border-indigo-500/20 hover:border-indigo-500/40'
          }
        `}
        aria-label={`${tier.ctaText} for ${tier.name} plan`}
      >
        {tier.ctaText}
      </motion.button>
    </motion.div>
  )
}

// Request Pricing Section
interface RequestPricingSectionProps {
  title: string
  subtitle?: string
  ctaText: string
  onCtaClick?: () => void
  className?: string
}

const RequestPricingSection: React.FC<RequestPricingSectionProps> = ({
  title,
  subtitle = 'Contact us to get custom pricing based on your consultancy needs and team size.',
  ctaText,
  onCtaClick,
  className = '',
}) => {
  return (
    <section
      id="pricing"
      className={`relative py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0E27] overflow-hidden ${className}`}
      aria-labelledby="pricing-section-title"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-indigo-900/10" aria-hidden="true" />
      
      <div className="relative max-w-4xl mx-auto z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">
              Pricing
            </span>
          </div>

          <h2
            id="pricing-section-title"
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
          >
            {title}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>

          <motion.button
            onClick={onCtaClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50"
            aria-label={ctaText}
          >
            <Zap className="w-5 h-5" aria-hidden="true" />
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
export type { PricingSectionProps, PricingTier }