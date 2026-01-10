/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow fonts to fail gracefully
  experimental: {
    fontLoaders: [
      { loader: 'next/font/google', options: { subsets: ['latin'] } },
    ],
  },
}

module.exports = nextConfig
