'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { 
  Check, 
  X, 
  ArrowRight, 
  Download, 
  Copy, 
  CheckCircle2, 
  Zap, 
  FileImage, 
  FileType, 
  Palette,
  Type,
  Image as ImageIcon,
  MessageSquare,
  Layout,
  FolderOpen,
  Mail,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default function BrandGuidelinesPage() {
  const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({})

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems({ ...copiedItems, [id]: true })
      setTimeout(() => {
        setCopiedItems({ ...copiedItems, [id]: false })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadAsset = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const logoAssets = [
    { name: 'Primary Logo (SVG)', url: '/craftly_logo.svg', format: 'SVG', type: 'logo', variant: 'horizontal' },
    { name: 'Primary Logo (PNG)', url: '/craftly_logo_highres.png', format: 'PNG', type: 'logo', variant: 'horizontal' },
    { name: 'Icon Only', url: '/craftly_logo.svg', format: 'SVG', type: 'icon', variant: 'icon' },
  ]

  const colorPalette = {
    primary: [
      { name: 'Indigo 600', hex: '#6366F1', rgb: '99, 102, 241', usage: 'Primary CTAs, active states, brand highlights' },
      { name: 'Indigo 700', hex: '#4F46E5', rgb: '79, 70, 229', usage: 'Hover states, emphasis, headers' },
      { name: 'Indigo 500', hex: '#818CF8', rgb: '129, 140, 248', usage: 'Secondary actions, subtle highlights' },
    ],
    neutral: [
      { name: 'Dark Mode Canvas', hex: '#020617', rgb: '2, 6, 23', usage: 'Dark theme background' },
      { name: 'Dark Mode Card', hex: '#0B1120', rgb: '11, 17, 32', usage: 'Card backgrounds in dark mode' },
      { name: 'Light Mode Canvas', hex: '#FFFFFF', rgb: '255, 255, 255', usage: 'Light theme background' },
      { name: 'Light Mode Card', hex: '#F8FAFC', rgb: '248, 250, 252', usage: 'Card backgrounds in light mode' },
    ],
    semantic: [
      { name: 'Success', primary: '#10B981', light: '#34D399', dark: '#059669' },
      { name: 'Warning', primary: '#F59E0B', light: '#FBBF24', dark: '#D97706' },
      { name: 'Error', primary: '#EF4444', light: '#F87171', dark: '#DC2626' },
      { name: 'Info', primary: '#0EA5E9', light: '#38BDF8', dark: '#0284C7' },
    ],
  }

  return (
    <main className="min-h-screen bg-[#0A0E27] text-gray-100 antialiased">
      <Navigation onGetStartedClick={() => {}} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Brand Guidelines</span>
            <span className="text-xs text-slate-500">Version 1.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            CraftlyAI Brand Guidelines
          </h1>
          <p className="text-slate-400 text-lg">Last Updated: 2024</p>
        </motion.div>

        {/* Table of Contents */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 p-6 rounded-3xl bg-slate-900/50 border border-indigo-500/20 backdrop-blur-sm"
        >
          <h2 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
            <FileType className="w-4 h-4" />
            Table of Contents
          </h2>
          <ul className="space-y-2 text-slate-300">
            <li><a href="#overview" className="hover:text-indigo-300 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Brand Overview</a></li>
            <li><a href="#logo" className="hover:text-indigo-300 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Logo Usage</a></li>
            <li><a href="#colors" className="hover:text-indigo-300 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Color Palette</a></li>
            <li><a href="#typography" className="hover:text-indigo-300 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Typography</a></li>
            <li><a href="#imagery" className="hover:text-indigo-300 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Imagery & Photography</a></li>
            <li><a href="#voice" className="hover:text-indigo-300 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Voice & Tone</a></li>
            <li><a href="#application" className="hover:text-indigo-300 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Application Guidelines</a></li>
            <li><a href="#files" className="hover:text-indigo-300 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Logo Assets</a></li>
          </ul>
        </motion.nav>

        {/* Brand Overview */}
        <section id="overview" className="mb-20 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-8 text-white flex items-center gap-3"
          >
            <FolderOpen className="w-8 h-8 text-indigo-400" />
            Brand Overview
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-300">Mission</h3>
              <p className="text-slate-300 leading-relaxed">
                CraftlyAI empowers independent consultants and freelancers worldwide to streamline their business operations through intelligent automation and strategic management tools.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-300">Brand Personality</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {['Professional: Enterprise-grade reliability', 'Futuristic: Cutting-edge AI technology', 'Efficient: Streamlined workflows', 'Strategic: Business-focused solutions', 'Premium: High-quality experience'].map((trait, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <Zap className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-300">Brand Values</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Innovation', desc: 'Leveraging AI to solve real business challenges' },
                  { name: 'Empowerment', desc: 'Enabling freelancers to scale their operations' },
                  { name: 'Precision', desc: 'Attention to detail in every interaction' },
                  { name: 'Trust', desc: 'Secure, reliable platform for business-critical operations' },
                ].map((value, idx) => (
                  <li key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-indigo-500/10 hover:border-indigo-500/30 transition-colors">
                    <span className="font-bold text-indigo-300">{value.name}:</span>
                    <span className="text-slate-300 ml-2">{value.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Logo Usage */}
        <section id="logo" className="mb-20 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-8 text-white flex items-center gap-3"
          >
            <FileImage className="w-8 h-8 text-indigo-400" />
            Logo Usage
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-300">Primary Logo</h3>
              <p className="text-slate-300 mb-4">
                The CraftlyAI logo consists of the wordmark "CraftlyAI" in uppercase, typically paired with a lightning bolt icon representing energy and AI intelligence.
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-indigo-500/20">
                <img src="/craftly_logo.svg" alt="CraftlyAI Logo" className="h-12" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Logo Variations</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Horizontal Logo', usage: 'Primary usage for headers, navigation bars, and horizontal layouts', clearance: 'Minimum 20px space', minSize: '120px width for digital' },
                  { name: 'Stacked Logo', usage: 'Square spaces, mobile headers, favicons', clearance: 'Minimum 15px space', minSize: '80px width/height' },
                  { name: 'Icon Only', usage: 'App icons, favicons, social media profile pictures', clearance: 'Minimum 10px space', minSize: '32px × 32px (favicon)' },
                ].map((variation, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <h4 className="font-bold text-indigo-300 mb-2">{variation.name}</h4>
                    <p className="text-sm text-slate-400 mb-3">Use: {variation.usage}</p>
                    <p className="text-sm text-slate-400 mb-1">Clearance: {variation.clearance}</p>
                    <p className="text-sm text-slate-400">Min Size: {variation.minSize}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-emerald-900/20 border border-emerald-500/30">
                <h4 className="font-bold text-emerald-300 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Do
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Use on white or light backgrounds with full color logo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Use on dark backgrounds with white/light logo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Maintain proper clearance space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Scale proportionally</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-rose-900/20 border border-rose-500/30">
                <h4 className="font-bold text-rose-300 mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  Don't
                </h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Rotate, skew, or distort the logo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Use colors outside the brand palette</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Place on busy backgrounds without proper contrast</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Change the font or letter spacing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Add effects (shadows, gradients, outlines) to the logo</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Color Palette */}
        <section id="colors" className="mb-20 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-8 text-white flex items-center gap-3"
          >
            <Palette className="w-8 h-8 text-indigo-400" />
            Color Palette
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Primary Colors</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {colorPalette.primary.map((color, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <div className="w-full h-20 rounded-xl mb-4 border border-slate-700/50" style={{ backgroundColor: color.hex }} />
                    <h4 className="font-bold text-white mb-3">{color.name}</h4>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between group">
                        <p className="text-xs text-slate-400 font-mono">HEX</p>
                        <button
                          onClick={() => copyToClipboard(color.hex, `hex-${idx}`)}
                          className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-indigo-300 transition-colors"
                        >
                          {color.hex}
                          {copiedItems[`hex-${idx}`] ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between group">
                        <p className="text-xs text-slate-400 font-mono">RGB</p>
                        <button
                          onClick={() => copyToClipboard(`rgb(${color.rgb})`, `rgb-${idx}`)}
                          className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-indigo-300 transition-colors"
                        >
                          {color.rgb}
                          {copiedItems[`rgb-${idx}`] ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300">{color.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Neutral Colors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {colorPalette.neutral.map((color, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <div className="w-full h-16 rounded-xl mb-4 border border-slate-700" style={{ backgroundColor: color.hex }} />
                    <h4 className="font-bold text-white mb-3">{color.name}</h4>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400 font-mono">HEX</p>
                        <button
                          onClick={() => copyToClipboard(color.hex, `neutral-hex-${idx}`)}
                          className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-indigo-300 transition-colors"
                        >
                          {color.hex}
                          {copiedItems[`neutral-hex-${idx}`] ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400 font-mono">RGB</p>
                        <button
                          onClick={() => copyToClipboard(`rgb(${color.rgb})`, `neutral-rgb-${idx}`)}
                          className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-indigo-300 transition-colors"
                        >
                          {color.rgb}
                          {copiedItems[`neutral-rgb-${idx}`] ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300">{color.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Semantic Colors</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {colorPalette.semantic.map((semantic, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <h4 className="font-bold text-white mb-4">{semantic.name}</h4>
                    <div className="space-y-3 mb-4">
                      {[
                        { label: 'Primary', value: semantic.primary },
                        { label: 'Light', value: semantic.light },
                        { label: 'Dark', value: semantic.dark },
                      ].map((variant, vIdx) => (
                        <div key={vIdx} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg border border-slate-700/50" style={{ backgroundColor: variant.value }} />
                          <div className="flex-1">
                            <p className="text-xs text-slate-400 mb-1">{variant.label}</p>
                            <button
                              onClick={() => copyToClipboard(variant.value, `semantic-${idx}-${vIdx}`)}
                              className="flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-indigo-300 transition-colors"
                            >
                              {variant.value}
                              {copiedItems[`semantic-${idx}-${vIdx}`] ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/30">
              <h4 className="font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <FileType className="w-5 h-5" />
                Color Usage Guidelines
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Text on backgrounds must meet WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Interactive elements must have 3:1 contrast ratio</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Use primary indigo for main CTAs and primary actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Use semantic colors consistently (green = success, red = error)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Test in both light and dark modes</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Typography */}
        <section id="typography" className="mb-20 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-8 text-white flex items-center gap-3"
          >
            <Type className="w-8 h-8 text-indigo-400" />
            Typography
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-300">Primary Typeface</h3>
              <p className="text-slate-300 mb-2">Inter - Modern, clean, professional sans-serif</p>
              <div className="relative group">
                <code className="block p-4 rounded-xl bg-slate-900/50 border border-indigo-500/20 text-sm text-slate-300 font-mono">
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                </code>
                <button
                  onClick={() => copyToClipboard("font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;", 'font-family')}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 transition-colors"
                >
                  {copiedItems['font-family'] ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Type Scale</h3>
              <div className="space-y-6">
                {[
                  { name: 'Display', size: '48px - 64px', weight: '900 (Black)', lineHeight: '1.1', spacing: '-0.02em', usage: 'Hero headlines, landing page titles' },
                  { name: 'Heading 1', size: '32px - 40px', weight: '800 (Extra Bold)', lineHeight: '1.2', spacing: '-0.01em', usage: 'Page titles, section headers' },
                  { name: 'Heading 2', size: '24px - 32px', weight: '800 (Extra Bold)', lineHeight: '1.3', spacing: '0', usage: 'Subsection headers, card titles' },
                  { name: 'Heading 3', size: '20px - 24px', weight: '700 (Bold)', lineHeight: '1.4', spacing: '0', usage: 'Component titles, form labels' },
                  { name: 'Body Large', size: '18px', weight: '400 (Regular)', lineHeight: '1.6', spacing: '0', usage: 'Lead paragraphs, important content' },
                  { name: 'Body Regular', size: '16px', weight: '400 (Regular)', lineHeight: '1.6', spacing: '0', usage: 'Standard body text, descriptions' },
                  { name: 'Body Small', size: '14px', weight: '400 (Regular)', lineHeight: '1.5', spacing: '0', usage: 'Secondary text, captions' },
                  { name: 'Label/Uppercase', size: '10px - 12px', weight: '700 - 900 (Bold to Black)', lineHeight: '1.4', spacing: '0.1em - 0.4em', usage: 'Labels, badges, navigation items, terminal-style UI elements' },
                ].map((type, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                      <h4 className="font-bold text-white text-lg">{type.name}</h4>
                      <div className="flex gap-4 text-sm text-slate-400">
                        <span className="font-mono">{type.size}</span>
                        <span>•</span>
                        <span>{type.weight}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-xs text-slate-400 mb-1">Line Height: {type.lineHeight} • Letter Spacing: {type.spacing}</p>
                      <p className="text-sm text-slate-300">{type.usage}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-700">
                      <p className="text-slate-300" style={{ 
                        fontSize: type.size.includes('-') ? type.size.split(' - ')[0] : type.size,
                        fontWeight: type.weight.split(' ')[0],
                        lineHeight: type.lineHeight,
                        letterSpacing: type.spacing === '0' ? '0' : type.spacing,
                      }}>
                        Sample text: The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/30">
              <h4 className="font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <FileType className="w-5 h-5" />
                Typography Guidelines
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Use font size and weight to establish clear visual hierarchy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Limit to 2-3 font sizes per section</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Minimum 14px for body text (16px recommended)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Line height should be 1.5-1.6 for body text</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Limit line length to 65-75 characters for optimal readability</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Imagery & Photography */}
        <section id="imagery" className="mb-20 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-8 text-white flex items-center gap-3"
          >
            <ImageIcon className="w-8 h-8 text-indigo-400" />
            Imagery & Photography
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-indigo-300">Image Style</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Clean and Minimal: Avoid cluttered or busy images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Professional: High-quality, business-focused imagery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Modern: Contemporary, tech-forward aesthetic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Neutral Backgrounds: Allow content to stand out</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-indigo-300">Illustration Style</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Geometric: Clean lines, simple shapes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Monochromatic or Two-Tone: Primarily using brand colors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Technical: Data visualizations, charts, diagrams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Abstract: Represent concepts rather than literal representations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20">
              <h3 className="text-xl font-bold mb-3 text-indigo-300">Icon Usage</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Library: Lucide React Icons (primary)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Style: Line icons, 1.5-2px stroke width</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Size: Consistent sizing (16px, 20px, 24px, 32px)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Color: Use brand colors or inherit from parent element</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Voice & Tone */}
        <section id="voice" className="mb-20 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-8 text-white flex items-center gap-3"
          >
            <MessageSquare className="w-8 h-8 text-indigo-400" />
            Voice & Tone
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-300">Voice Characteristics</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Professional yet Approachable: Enterprise-grade without being intimidating</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Confident: Assured in our capabilities and solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Efficient: Direct, no-nonsense communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Strategic: Business-focused language</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Key Phrases</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { term: 'Strategic Node', definition: 'Company/Organization' },
                  { term: 'Registry', definition: 'User account/profile' },
                  { term: 'Terminal', definition: 'Application interface' },
                  { term: 'Sync/Synchronize', definition: 'Save/Update operations' },
                  { term: 'Dispatch', definition: 'Send/Submit actions' },
                  { term: 'Operative', definition: 'User/Team member' },
                ].map((phrase, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <span className="font-bold text-indigo-300">{phrase.term}:</span>
                    <span className="text-slate-300 ml-2">{phrase.definition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-emerald-900/20 border border-emerald-500/30">
                <h4 className="font-bold text-emerald-300 mb-4">Do</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Use active voice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Be specific and concrete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Use business terminology appropriately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Keep sentences concise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Use bullet points for lists</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-rose-900/20 border border-rose-500/30">
                <h4 className="font-bold text-rose-300 mb-4">Don't</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Use jargon without explanation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Be overly casual or informal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Use passive voice unnecessarily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Write overly long paragraphs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Use exclamation points excessively</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Application Guidelines */}
        <section id="application" className="mb-20 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-8 text-white flex items-center gap-3"
          >
            <Layout className="w-8 h-8 text-indigo-400" />
            Application Guidelines
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">UI Component Styling</h3>
              
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                  <h4 className="font-bold text-white mb-3">Buttons</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Primary: Indigo 600 background, white text, rounded-xl (12px)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Secondary: Transparent with border, inherit text color</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Size: Height 44px (h-11) for primary actions, 40px (h-10) for secondary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Typography: Uppercase, tracking-widest, font-black, 10-11px</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                  <h4 className="font-bold text-white mb-3">Cards</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Background: var(--bg-card) in theme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Border: 1px solid var(--border-ui)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Border Radius: rounded-3xl (24px) for main cards, rounded-2xl (16px) for smaller elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Padding: p-10 (40px) for main cards, p-6 (24px) for compact cards</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                  <h4 className="font-bold text-white mb-3">Input Fields</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Height: h-14 (56px) for primary inputs, h-12 (48px) for secondary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Border: 1px solid var(--border-ui)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Border Radius: rounded-2xl (16px)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Background: var(--input-bg) or var(--bg-card-muted)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Focus: Border color changes to var(--accent)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/30">
              <h3 className="text-xl font-bold mb-4 text-indigo-300 flex items-center gap-2">
                <FileType className="w-5 h-5" />
                Spacing System
              </h3>
              <p className="text-slate-300 mb-2">Based on 4px base unit</p>
              <p className="text-slate-300 text-sm">Common spacing: 4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px</p>
            </div>
          </motion.div>
        </section>

        {/* Logo Assets Download Section */}
        <section id="files" className="mb-20 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-8 text-white flex items-center gap-3"
          >
            <Download className="w-8 h-8 text-indigo-400" />
            Logo Assets
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Available Logo Files</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {logoAssets.map((asset, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">{asset.name}</h4>
                        <p className="text-xs text-slate-400 font-mono mb-2">{asset.format}</p>
                        <span className="inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-900/30 rounded-lg">
                          {asset.variant}
                        </span>
                      </div>
                      <div className="ml-4 p-3 rounded-xl bg-white/5 border border-indigo-500/20">
                        <img 
                          src={asset.url} 
                          alt={asset.name}
                          className="h-8 w-auto"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => downloadAsset(asset.url, asset.name.toLowerCase().replace(/\s+/g, '-') + '.' + asset.format.toLowerCase())}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm uppercase tracking-widest transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download {asset.format}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-300">File Formats & Use Cases</h3>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-indigo-400" />
                    SVG (Scalable Vector Graphics)
                  </h4>
                  <p className="text-slate-300 text-sm mb-2">Best for: Web usage, scaling to any size, crisp rendering</p>
                  <p className="text-slate-400 text-xs font-mono">Files: craftly_logo.svg, craftly_logo_white.svg, craftly_icon.svg</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-indigo-400" />
                    PNG (Portable Network Graphics)
                  </h4>
                  <p className="text-slate-300 text-sm mb-2">Best for: Transparent backgrounds, specific sizes, compatibility</p>
                  <p className="text-slate-400 text-xs font-mono">Files: craftly_logo_highres.png, craftly_logo_white.png, various icon sizes</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-indigo-500/20">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-indigo-400" />
                    ICO (Icon)
                  </h4>
                  <p className="text-slate-300 text-sm mb-2">Best for: Favicons, browser tabs</p>
                  <p className="text-slate-400 text-xs font-mono">File: craftly_favicon.ico</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/30">
              <h3 className="text-xl font-bold mb-4 text-indigo-300">Logo Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-white mb-2">Standard Logo Sizes (Web)</h4>
                  <ul className="space-y-1 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Small: 120px × 40px (minimum recommended)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Medium: 180px × 60px (standard)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Large: 240px × 80px (hero sections)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Icon Sizes</h4>
                  <ul className="space-y-1 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Favicon: 32px × 32px</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>App Icon: 1024px × 1024px</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Social Media: 1200px × 1200px (square)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>Browser Icon: 192px × 192px, 512px × 512px</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-indigo-900/30 border border-indigo-500/30"
          >
            <h3 className="text-2xl font-black mb-4 text-white flex items-center gap-2">
              <Mail className="w-6 h-6 text-indigo-400" />
              Contact & Support
            </h3>
            <p className="text-slate-300 mb-4">
              For brand-related questions or requests for additional assets:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                Email: <a href="mailto:branding@craftlyai.app" className="text-indigo-300 hover:text-indigo-200 flex items-center gap-1">branding@craftlyai.app <ExternalLink className="w-3 h-3" /></a>
              </li>
              <li className="flex items-center gap-2">
                <FileType className="w-4 h-4 text-indigo-400" />
                Documentation: See /docs/BRAND_GUIDELINES.md
              </li>
              <li className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-indigo-400" />
                Asset Requests: Contact design team
              </li>
            </ul>
            <p className="text-xs text-slate-400 mt-6 pt-6 border-t border-indigo-500/20">
              © 2024 CraftlyAI. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              This brand guideline document is proprietary and confidential. Unauthorized use of CraftlyAI branding is prohibited.
            </p>
          </motion.div>
        </section>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm uppercase tracking-widest transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
