# CraftlyAI Landing Page

A modern, professional landing page for CraftlyAI - an AI-powered business management platform for independent consultants and freelancers in the UAE.

## 🚀 Features

- ✅ **Complete Landing Page** with all sections (Navigation, Hero, Features, Social Proof, Pricing, FAQ, CTA, Footer)
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Dark Mode Support** - Full dark mode implementation
- ✅ **Accessibility** - WCAG 2.1 AA compliant with proper ARIA labels
- ✅ **SEO Optimized** - Complete meta tags, Open Graph, and structured data
- ✅ **TypeScript** - Fully typed components with interfaces
- ✅ **Terminal Aesthetic** - Command-line inspired design elements
- ✅ **Smooth Animations** - Professional transitions and hover effects
- ✅ **Production Ready** - Optimized for performance and best practices

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## 📁 Project Structure

```
landing_page/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles & Tailwind utilities
├── components/
│   ├── Navigation.tsx      # Responsive navigation header
│   ├── HeroSectionSplit.tsx # Hero with split layout
│   ├── FeaturesSection.tsx # 5 feature cards grid
│   ├── SocialProofSection.tsx # Testimonials & stats
│   ├── PricingSection.tsx  # Pricing tiers
│   ├── FAQSection.tsx      # FAQ accordion
│   ├── CTASection.tsx      # Final call-to-action
│   └── Footer.tsx          # Footer with links
└── public/                 # Static assets
```

## 🎨 Brand Guidelines

- **Primary Color:** Indigo #6366F1
- **Font:** Inter (sans-serif)
- **Tone:** Professional, futuristic, efficient, strategic
- **Aesthetic:** Terminal/command-line inspired
- **Target Audience:** UAE-based freelancers and independent consultants

## 🔧 Customization

### Update Content

All components accept props for customization. See individual component files or example files for usage:

```typescript
// Example: Customize Hero Section
<HeroSectionSplit
  headline="Your Custom Headline"
  subheadline="Your custom supporting text"
  primaryCtaText="Get Started"
  onPrimaryCtaClick={handleClick}
/>
```

### Update Colors

Modify `tailwind.config.js` or use CSS variables in `app/globals.css`:

```javascript
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#6366F1',
    dark: '#4F46E5',
  }
}
```

### Update Branding

- Replace logo: Update Navigation and Footer components
- Update company name: Modify default props in Footer
- Update social links: Customize socialLinks prop in Footer

## 📱 Sections Overview

1. **Navigation** - Sticky header with mobile menu
2. **Hero** - Split layout with headline, CTAs, and illustration
3. **Features** - 5 key features in responsive grid
4. **Social Proof** - Statistics and testimonials
5. **Pricing** - 3 pricing tiers (or request pricing)
6. **FAQ** - 8 frequently asked questions
7. **Final CTA** - Gradient section with prominent CTA
8. **Footer** - Links, social media, copyright

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Proper focus management
- Color contrast compliance (WCAG AA)

## 🚀 Deployment

### Vercel (Recommended - Production Ready)

This project is optimized for Vercel deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Or via Vercel Dashboard:**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will auto-detect Next.js settings
4. Click "Deploy"

**Production Features Configured:**
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Image optimization (WebP/AVIF)
- ✅ Code splitting and minification
- ✅ Conditional logging (dev only)
- ✅ Error handling and fallbacks
- ✅ Font fallbacks for resilience
- ✅ Environment variable support

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Traditional hosting with Node.js

## 📝 Environment Variables

**Optional Environment Variables:**

Create a `.env.local` file (or set in Vercel dashboard):

```env
# Application URL (used for OpenGraph metadata)
# Defaults to staging: https://stage.craftlyai.app
# For production, set: NEXT_PUBLIC_APP_URL=https://craftlyai.com
NEXT_PUBLIC_APP_URL=https://stage.craftlyai.app

# Environment
NODE_ENV=production
```

**Note:** Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser.

## 🔍 SEO

The landing page includes:
- Meta description
- Open Graph tags
- Twitter Card tags
- Structured data ready
- Semantic HTML
- Proper heading hierarchy

Update `app/layout.tsx` to customize SEO metadata.

## 📄 License

This project is proprietary software for CraftlyAI.

## 🤝 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for UAE's independent consultants and freelancers**
# craftly_landingpage
