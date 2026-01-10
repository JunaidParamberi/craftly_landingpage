import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Guidelines - CraftlyAI',
  description: 'CraftlyAI Brand Guidelines: Logo usage, color palette, typography, voice & tone, and application guidelines for maintaining brand consistency.',
  keywords: [
    'CraftlyAI brand guidelines',
    'brand identity',
    'logo usage',
    'brand colors',
    'typography guidelines',
    'brand style guide',
  ],
}

export default function BrandGuidelinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
