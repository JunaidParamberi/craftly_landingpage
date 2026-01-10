# CraftlyAI Landing Page Structure

## Overview
Complete landing page for CraftlyAI built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Project Structure

```
landing_page/
├── app/
│   ├── layout.tsx          # Root layout with metadata and SEO
│   ├── page.tsx            # Main landing page (combines all sections)
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── Navigation.tsx      # Responsive navigation header
│   ├── HeroSectionSplit.tsx # Hero section with split layout
│   ├── FeaturesSection.tsx # Features grid with 5 feature cards
│   ├── SocialProofSection.tsx # Testimonials and statistics
│   ├── PricingSection.tsx  # Pricing tiers or request pricing
│   ├── FAQSection.tsx      # FAQ accordion
│   ├── CTASection.tsx      # Final call-to-action
│   └── Footer.tsx          # Footer with links and social
├── public/                 # Static assets (images, logos)
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── next.config.js          # Next.js configuration

```

## Sections

1. **Navigation** (`components/Navigation.tsx`)
   - Sticky header with backdrop blur
   - Desktop horizontal menu
   - Mobile hamburger menu
   - Smooth scroll to sections
   - CTA button

2. **Hero Section** (`components/HeroSectionSplit.tsx`)
   - Split layout: text left, illustration right
   - Headline and subheadline
   - Two CTA buttons
   - Trust indicators
   - Terminal-style illustration

3. **Features Section** (`components/FeaturesSection.tsx`)
   - 5 feature cards
   - Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
   - Icons from Lucide React
   - Learn more links

4. **Social Proof** (`components/SocialProofSection.tsx`)
   - Statistics (500+ freelancers, etc.)
   - 4 testimonials
   - Star ratings
   - Alternating layout

5. **Pricing Section** (`components/PricingSection.tsx`)
   - 3 tiers: Free, Pro, Enterprise
   - Feature comparison
   - "Most Popular" badge
   - CTA buttons per tier

6. **FAQ Section** (`components/FAQSection.tsx`)
   - 8 questions
   - Accordion format
   - Smooth animations
   - Mobile-friendly

7. **Final CTA** (`components/CTASection.tsx`)
   - Gradient background
   - Large headline
   - Prominent CTA button
   - Trust indicators
   - Social proof

8. **Footer** (`components/Footer.tsx`)
   - Company info and tagline
   - Navigation links (Product, Resources, Company)
   - Social media links
   - Copyright

## Brand Guidelines

- **Primary Color:** Indigo #6366F1
- **Font:** Inter (sans-serif)
- **Tone:** Professional, futuristic, efficient, strategic
- **Aesthetic:** Terminal/command-line inspired
- **Target:** UAE-based freelancers and independent consultants

## Features

- ✅ Fully responsive (mobile-first)
- ✅ Dark mode support
- ✅ Accessibility (ARIA labels, semantic HTML)
- ✅ Smooth scroll behavior
- ✅ TypeScript with proper types
- ✅ SEO optimized (meta tags, Open Graph)
- ✅ Production-ready code

## Getting Started

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

## Component Usage

All components are self-contained and can be customized via props. See individual component files for prop interfaces and example usage files for implementation examples.

## Customization

1. **Content:** Update default props in each component
2. **Colors:** Modify Tailwind config or use CSS variables in `globals.css`
3. **Branding:** Update logos, colors, and text in components
4. **Routing:** Add Next.js routing if needed for multi-page setup

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images (use Next.js Image component)
- Code splitting (Next.js automatic)
- Lazy loading for components
- Minimal bundle size

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Proper ARIA labels
- Semantic HTML
