// Currency detection and conversion utility

export interface CurrencyInfo {
  code: string
  symbol: string
  name: string
  country: string
}

// Map of country codes to currency info
const COUNTRY_TO_CURRENCY: Record<string, CurrencyInfo> = {
  AE: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'UAE' }, // Using traditional symbol (د.إ) - new symbol (D with two horizontal lines) introduced in 2025 may need custom implementation
  US: { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States' },
  GB: { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom' },
  // European countries using EUR
  FR: { code: 'EUR', symbol: '€', name: 'Euro', country: 'France' },
  DE: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Germany' },
  IT: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Italy' },
  ES: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Spain' },
  NL: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Netherlands' },
  BE: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Belgium' },
  AT: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Austria' },
  PT: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Portugal' },
  IE: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Ireland' },
  GR: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Greece' },
  FI: { code: 'EUR', symbol: '€', name: 'Euro', country: 'Finland' },
  EU: { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union' },
  CA: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada' },
  AU: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia' },
  IN: { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India' },
  SG: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore' },
  JP: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan' },
  CN: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China' },
  SA: { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', country: 'Saudi Arabia' },
  KW: { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', country: 'Kuwait' },
  QA: { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', country: 'Qatar' },
  BH: { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar', country: 'Bahrain' },
  OM: { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial', country: 'Oman' },
  ZA: { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa' },
  NG: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria' },
  EG: { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', country: 'Egypt' },
  TR: { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey' },
  BR: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil' },
  MX: { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'Mexico' },
  PK: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', country: 'Pakistan' },
  BD: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh' },
  PH: { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines' },
  ID: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia' },
  MY: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia' },
  TH: { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand' },
  VN: { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam' },
}

// Default currencies
const DEFAULT_CURRENCY_USD = COUNTRY_TO_CURRENCY.US // USD for unknown countries
const DEFAULT_CURRENCY_AED = COUNTRY_TO_CURRENCY.AE // AED for base pricing

// Exchange rates cache
let exchangeRatesCache: Record<string, number> | null = null
let exchangeRatesCacheTime: number = 0
const CACHE_DURATION = 3600000 // 1 hour in milliseconds

/**
 * Get currency info from country code
 * Falls back to USD if country/currency not found (for unsupported countries)
 */
export function getCurrencyFromCountry(countryCode: string): CurrencyInfo {
  const currency = COUNTRY_TO_CURRENCY[countryCode]
  if (!currency) {
    // If country not found, default to USD (for unsupported countries)
    console.warn(`Country code ${countryCode} not found in currency map, defaulting to USD`)
    return DEFAULT_CURRENCY_USD
  }
  return currency
}

/**
 * Detect user's country from IP geolocation (most reliable)
 * Falls back to timezone and locale if IP fails
 */
export async function detectUserCountry(): Promise<string> {
  try {
    // PRIORITY 1: Try IP-based geolocation FIRST (most accurate)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
      }, 3000) // 3 second timeout
      
      try {
        const response = await fetch('https://ipapi.co/json/', {
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (response.ok) {
          const data = await response.json()
          if (data.country_code) {
            const countryCode = data.country_code.toUpperCase()
            console.log('✅ IP geolocation detected country:', countryCode, 'from:', data.country_name || 'Unknown')
            
            // If country is in our currency map, use it immediately
            if (COUNTRY_TO_CURRENCY[countryCode]) {
              console.log(`✅ Using currency for ${countryCode}:`, COUNTRY_TO_CURRENCY[countryCode].code)
              return countryCode
            }
            
            // Even if not in map, return the country code anyway
            // getCurrencyFromCountry will handle fallback to USD for unsupported countries
            console.log(`⚠️ Country ${countryCode} detected but not in currency map, will fallback to USD`)
            return countryCode
          }
        } else {
          console.warn('⚠️ IP geolocation API returned non-OK status:', response.status, response.statusText)
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        if (fetchError.name === 'AbortError' || fetchError.message?.includes('aborted')) {
          console.warn('⚠️ IP geolocation timed out (3s), trying fallback methods')
        } else if (fetchError.message?.includes('Failed to fetch') || fetchError.message?.includes('NetworkError') || fetchError.message?.includes('CORS')) {
          console.warn('⚠️ IP geolocation network error (possibly blocked by CORS or ad blocker), trying fallback methods')
        } else {
          throw fetchError
        }
      }
    } catch (error: any) {
      console.warn('⚠️ IP geolocation failed:', error.message || error)
    }

    // PRIORITY 2: Try browser timezone detection
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      console.log('📍 Timezone detected:', timezone)
      
      // UAE timezone checks
      if (timezone === 'Asia/Dubai' || 
          timezone.toLowerCase().includes('dubai') || 
          timezone.toLowerCase().includes('abu')) {
        console.log('✅ UAE detected from timezone:', timezone)
        return 'AE'
      }
      
      // India timezone
      if (timezone === 'Asia/Kolkata' || timezone.toLowerCase().includes('kolkata')) {
        return 'IN'
      }
      
      // China timezones
      if (timezone.includes('Shanghai') || timezone.includes('Beijing') || timezone === 'Asia/Shanghai') {
        return 'CN'
      }
      
      // Other timezone mappings
      if (timezone.includes('America/New_York') || timezone.includes('America/Chicago') || 
          timezone.includes('America/Los_Angeles') || timezone.includes('America/')) {
        return 'US'
      }
      if (timezone.includes('Europe/London') || timezone.includes('London')) {
        return 'GB'
      }
      if (timezone.includes('Europe/')) {
        // Map European timezones to EUR-using countries
        if (timezone.includes('Paris') || timezone.includes('France')) return 'FR'
        if (timezone.includes('Berlin') || timezone.includes('Germany')) return 'DE'
        if (timezone.includes('Rome') || timezone.includes('Italy')) return 'IT'
        if (timezone.includes('Madrid') || timezone.includes('Spain')) return 'ES'
        if (timezone.includes('Amsterdam') || timezone.includes('Netherlands')) return 'NL'
        if (timezone.includes('Brussels') || timezone.includes('Belgium')) return 'BE'
        if (timezone.includes('Vienna') || timezone.includes('Austria')) return 'AT'
        if (timezone.includes('Lisbon') || timezone.includes('Portugal')) return 'PT'
        if (timezone.includes('Dublin') || timezone.includes('Ireland')) return 'IE'
        if (timezone.includes('Athens') || timezone.includes('Greece')) return 'GR'
        if (timezone.includes('Helsinki') || timezone.includes('Finland')) return 'FI'
        // Default for other European countries
        return 'FR' // Default to France (EUR) for other EU countries
      }
      if (timezone.includes('Canada') || timezone.includes('Toronto') || timezone.includes('Vancouver')) {
        return 'CA'
      }
      if (timezone.includes('Australia') || timezone.includes('Sydney') || timezone.includes('Melbourne')) {
        return 'AU'
      }
      if (timezone.includes('Singapore') || timezone === 'Asia/Singapore') {
        return 'SG'
      }
      if (timezone.includes('Tokyo') || timezone === 'Asia/Tokyo') {
        return 'JP'
      }
    } catch (error) {
      console.warn('⚠️ Timezone detection failed:', error)
    }

    // PRIORITY 3: Try browser locale
    try {
      const locale = navigator.language || (navigator as any).userLanguage || 'en-US'
      console.log('🌐 Browser locale:', locale)
      
      const localeLower = locale.toLowerCase()
      const localeParts = locale.split('-')
      
      // Check for specific locale patterns
      if (localeLower.includes('ae') || localeLower === 'ar-ae' || localeLower.includes('uae')) {
        console.log('✅ UAE detected from locale:', locale)
        return 'AE'
      }
      
      if (localeLower.includes('in') || localeLower === 'hi-in' || localeLower === 'en-in') {
        return 'IN'
      }
      
      if (localeLower.includes('cn') || localeLower === 'zh-cn') {
        return 'CN'
      }
      
      if (localeParts.length > 1) {
        const countryCode = localeParts[1].toUpperCase()
        // If detected country is in our currency map, return it
        if (COUNTRY_TO_CURRENCY[countryCode]) {
          console.log(`✅ Country ${countryCode} detected from locale`)
          return countryCode
        }
      }
    } catch (error) {
      console.warn('⚠️ Locale detection failed:', error)
    }

    // FALLBACK: If all methods fail, try one more check for UAE
    // Check if timezone suggests UAE (even if previous check missed it)
    try {
      const finalTimezoneCheck = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase()
      if (finalTimezoneCheck.includes('dubai') || finalTimezoneCheck.includes('abu') || finalTimezoneCheck === 'asia/dubai') {
        console.log('✅ UAE detected in final timezone check:', finalTimezoneCheck)
        return 'AE'
      }
    } catch (e) {
      // Ignore
    }

    // Final fallback: Default to USD only if we truly can't detect anything
    // (User said show dollar if currency not available - meaning for unsupported countries)
    console.log('⚠️ All detection methods failed, defaulting to USD (unsupported location)')
    return 'US' // Default to USD for unsupported/unrecognized locations
  } catch (error) {
    console.error('❌ Country detection failed completely:', error)
    // On complete failure, default to USD
    return 'US' // Default to USD on error
  }
}

/**
 * Fetch exchange rates from AED to other currencies
 */
export async function fetchExchangeRates(): Promise<Record<string, number>> {
  // Check cache first
  const now = Date.now()
  if (exchangeRatesCache && (now - exchangeRatesCacheTime) < CACHE_DURATION) {
    return exchangeRatesCache
  }

  try {
    // Using exchangerate-api.com (free tier)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/AED')
    if (!response.ok) {
      throw new Error('Exchange rate API failed')
    }
    
    const data = await response.json()
    const rates = data.rates || {}
    
    // Cache the rates
    exchangeRatesCache = rates
    exchangeRatesCacheTime = now
    
    return rates
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error)
    
    // Return cached rates if available, or default rates
    if (exchangeRatesCache) {
      return exchangeRatesCache
    }
    
    // Fallback: return default exchange rates (approximate)
    return {
      USD: 0.27,
      GBP: 0.21,
      EUR: 0.25,
      CAD: 0.37,
      AUD: 0.41,
      INR: 22.5,
      SGD: 0.37,
      JPY: 41.5,
      CNY: 1.95,
      SAR: 1.02,
      KWD: 0.083,
      QAR: 0.98,
      BHD: 0.10,
      OMR: 0.10,
      AED: 1, // Base currency
    }
  }
}

/**
 * Convert AED price to target currency
 * Falls back to USD rate if target currency not available
 */
export async function convertPrice(aedPrice: number, targetCurrency: string): Promise<number> {
  if (targetCurrency === 'AED') {
    return aedPrice
  }

  const rates = await fetchExchangeRates()
  let rate = rates[targetCurrency]
  
  // If currency rate not found, try USD as fallback
  if (!rate) {
    console.warn(`Exchange rate for ${targetCurrency} not found, falling back to USD`)
    rate = rates['USD'] || 0.27 // Default USD rate if API fails
  }
  
  return aedPrice * rate
}

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number, currency: CurrencyInfo, showCode = false): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: currency.code === 'JPY' ? 0 : 2,
  }).format(amount)

  if (showCode) {
    return `${currency.code} ${formatted}`
  }

  // Return with symbol
  if (currency.symbol) {
    // For right-to-left currencies, symbol might be after
    if (['SAR', 'QAR', 'OMR', 'KWD', 'BHD', 'AED'].includes(currency.code)) {
      return `${formatted} ${currency.symbol}`
    }
    return `${currency.symbol}${formatted}`
  }

  return `${currency.code} ${formatted}`
}

/**
 * Get user's currency based on their location
 */
export async function getUserCurrency(): Promise<CurrencyInfo> {
  const countryCode = await detectUserCountry()
  return getCurrencyFromCountry(countryCode)
}
