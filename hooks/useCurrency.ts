'use client'

import { useState, useEffect } from 'react'
import { 
  getUserCurrency, 
  convertPrice, 
  formatPrice, 
  type CurrencyInfo,
  getCurrencyFromCountry
} from '@/lib/currency'

const isDevelopment = process.env.NODE_ENV === 'development'

const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) console.log(...args)
  },
  warn: (...args: any[]) => {
    if (isDevelopment) console.warn(...args)
  },
  error: (...args: any[]) => {
    console.error(...args) // Always log errors
  },
}

export function useCurrency() {
  // Initialize with AED as default since base prices are in AED (will be updated on detection)
  const [currency, setCurrency] = useState<CurrencyInfo>(getCurrencyFromCountry('AE'))
  const [isLoading, setIsLoading] = useState(true)
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({})

  useEffect(() => {
    async function detectCurrency() {
      try {
        setIsLoading(true)
        const detectedCurrency = await getUserCurrency()
        logger.log('Detected currency:', detectedCurrency)
        setCurrency(detectedCurrency)
      } catch (error) {
        logger.error('Currency detection failed:', error)
        // Default to AED if detection fails since base prices are in AED
        setCurrency(getCurrencyFromCountry('AE'))
      } finally {
        setIsLoading(false)
      }
    }

    detectCurrency()
  }, [])

  const convertAEDPrice = async (aedPrice: number | string): Promise<number> => {
    const price = typeof aedPrice === 'string' ? parseFloat(aedPrice) : aedPrice
    if (isNaN(price)) return 0
    
    if (currency.code === 'AED') {
      return price
    }

    try {
      const converted = await convertPrice(price, currency.code)
      // If conversion returns same value (rate not found), fallback to USD
      if (converted === price && currency.code !== 'AED') {
        logger.warn(`Currency ${currency.code} not available, falling back to USD`)
        return await convertPrice(price, 'USD')
      }
      return converted
    } catch (error) {
      logger.error('Price conversion failed:', error)
      // Fallback to USD conversion
      try {
        return await convertPrice(price, 'USD')
      } catch (fallbackError) {
        logger.error('USD fallback conversion also failed:', fallbackError)
        return price * 0.27 // Rough AED to USD conversion as last resort
      }
    }
  }

  const formatCurrency = (amount: number | string, showCode = false): string => {
    const price = typeof amount === 'string' ? parseFloat(amount) : amount
    if (isNaN(price)) return formatPrice(0, currency, showCode)
    
    return formatPrice(price, currency, showCode)
  }

  const setCurrencyManually = (countryCode: string) => {
    setCurrency(getCurrencyFromCountry(countryCode))
  }

  return {
    currency,
    isLoading,
    convertAEDPrice,
    formatCurrency,
    setCurrency: setCurrencyManually,
  }
}
