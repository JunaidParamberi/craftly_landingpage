'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  items?: FAQItem[]
  className?: string
  allowMultipleOpen?: boolean
}

const defaultFAQItems: FAQItem[] = [
  {
    id: '1',
    question: 'Is there a free trial?',
    answer:
      'Yes! All plans include a 14-day free trial with full access to all features. No credit card required to start. You can explore CraftlyAI risk-free and cancel anytime during the trial period if it doesn\'t meet your needs.',
  },
  {
    id: '2',
    question: 'Do I need a credit card to start?',
    answer:
      'No credit card is required to start your free trial. Simply sign up with your email address and begin using CraftlyAI immediately. We\'ll only ask for payment information when you decide to continue with a paid plan after your trial ends.',
  },
  {
    id: '3',
    question: 'Can I use this for multiple businesses?',
    answer:
      'Yes, you can manage multiple businesses or consultancies from a single CraftlyAI account. Our Pro and Enterprise plans support multiple business profiles, allowing you to separate clients, invoices, and financial tracking for each business entity you operate.',
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express) as well as bank transfers for annual plans. All payments are processed securely through our payment partners. We support multiple international currencies including USD, EUR, GBP, and many more.',
  },
  {
    id: '5',
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with international data protection standards. Your data is stored securely in certified data centers with daily backups. We never share your data with third parties without your explicit consent.',
  },
  {
    id: '6',
    question: 'Can I export my data?',
    answer:
      'Yes, you have full control over your data. You can export all your invoices, proposals, financial reports, and client information at any time in multiple formats including PDF, CSV, and Excel. Data portability is a core feature, and you can download everything with just a few clicks from your account settings.',
  },
  {
    id: '7',
    question: 'Do you support tax/VAT calculations?',
    answer:
      'Yes, CraftlyAI supports tax and VAT calculations for multiple countries and regions. We support various tax systems including VAT, GST, sales tax, and more. The platform automatically handles tax calculations based on your location settings, generates tax-compliant invoices, and provides reports that align with local tax regulations.',
  },
  {
    id: '8',
    question: 'Can I customize invoices and proposals?',
    answer:
      'Absolutely! With Pro and Enterprise plans, you can fully customize your invoices and proposals with your own branding, logo, colors, and company details. You can also create multiple templates for different types of clients or projects. Custom branding helps you maintain a professional, consistent image across all client communications.',
  },
]

const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about CraftlyAI for independent consultants and freelancers worldwide.',
  items = defaultFAQItems,
  className = '',
  allowMultipleOpen = false,
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (!allowMultipleOpen) {
          newSet.clear()
        }
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section
      id="faq"
      className={`py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0E27] ${className}`}
      aria-labelledby="faq-section-title"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal Label */}
          <motion.div 
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 font-mono">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            id="faq-section-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <FAQAccordionItem
                item={item}
                isOpen={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// FAQ Accordion Item Component
interface FAQAccordionItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <motion.div
      className="
        border border-indigo-500/20
        rounded-lg
        overflow-hidden
        transition-all duration-200
        hover:border-indigo-500/40
        hover:shadow-md
      "
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Question Button */}
      <motion.button
        onClick={onToggle}
        className="
          w-full
          px-4 py-3 md:px-5 md:py-3.5
          text-left
          flex items-center justify-between
          bg-slate-800/50
          hover:bg-slate-800/60
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset
          group
        "
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-sm md:text-base font-semibold text-slate-200 pr-3 flex-1 group-hover:text-white transition-colors">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className="
              w-4 h-4 md:w-5 md:h-5
              flex-shrink-0
              text-slate-400
              group-hover:text-indigo-400
              transition-colors duration-200
            "
            aria-hidden="true"
          />
        </motion.div>
      </motion.button>

      {/* Answer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-question-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 md:px-5 md:py-4 bg-slate-900/50 border-t border-indigo-500/20">
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FAQSection
export type { FAQSectionProps, FAQItem }
