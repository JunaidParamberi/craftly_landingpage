# Deployment Guide for Vercel

This guide will help you deploy the CraftlyAI landing page to Vercel.

## Prerequisites

- Node.js 18.x or higher
- A Vercel account ([sign up here](https://vercel.com/signup))
- Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard

1. **Connect your repository:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel will auto-detect Next.js settings

2. **Configure build settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

3. **Environment Variables:**
   - `NEXT_PUBLIC_APP_URL`: Your app URL (defaults to `https://stage.craftlyai.app` for beta/staging)
     - For staging: `NEXT_PUBLIC_APP_URL=https://stage.craftlyai.app`
     - For production: `NEXT_PUBLIC_APP_URL=https://craftlyai.com`
   - Add any other environment variables if needed

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **For production:**
   ```bash
   vercel --prod
   ```

## Environment Variables

Create a `.env.local` file (or set in Vercel dashboard):

```env
# Application URL (used for OpenGraph metadata)
# Defaults to staging: https://stage.craftlyai.app
# For production, set: NEXT_PUBLIC_APP_URL=https://craftlyai.com
NEXT_PUBLIC_APP_URL=https://stage.craftlyai.app

# Environment
NODE_ENV=production
```

## Build & Test Locally

Before deploying, test the production build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to test.

## Production Optimizations

The project includes:

✅ **Security Headers** - Configured in `next.config.js` and `vercel.json`  
✅ **Image Optimization** - Next.js Image component with WebP/AVIF support  
✅ **Code Splitting** - Automatic via Next.js  
✅ **Minification** - SWC minifier enabled  
✅ **Conditional Logging** - Console logs only in development  
✅ **Error Handling** - Proper error boundaries and fallbacks  
✅ **Performance** - Optimized fonts, compressed assets  

## Vercel Configuration

The `vercel.json` file includes:

- Security headers (X-Frame-Options, CSP, etc.)
- Health check endpoint
- Region configuration (US East)

## Monitoring

After deployment, monitor:

- **Build Logs** - Check Vercel dashboard for build errors
- **Runtime Logs** - View function logs in Vercel dashboard
- **Analytics** - Enable Vercel Analytics for performance insights
- **Error Tracking** - Consider adding Sentry or similar service

## Custom Domain

To add a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your domain (e.g., `craftlyai.com`)
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18.x+)
- Verify all dependencies are installed
- Check for TypeScript errors: `npm run lint`

### Runtime Errors

- Check Vercel function logs
- Verify environment variables are set
- Check API endpoints (currency conversion, geolocation)

### Performance Issues

- Enable Vercel Analytics
- Check Core Web Vitals
- Optimize images (already configured)
- Consider enabling ISR (Incremental Static Regeneration)

## Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
