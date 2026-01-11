# Staging Configuration - Beta Environment

## Staging URL: `stage.craftlyai.app`

The application is now configured to use the staging URL `stage.craftlyai.app` for beta deployment.

## Configuration Changes

### 1. **App Metadata (`app/layout.tsx`)**
- OpenGraph URLs now use `NEXT_PUBLIC_APP_URL` environment variable
- Defaults to `https://stage.craftlyai.app` if not set
- Used for:
  - OpenGraph `url` property
  - OpenGraph `images` (og-image.jpg)
  - Twitter Card `images`

### 2. **Next.js Config (`next.config.js`)**
- Environment variable defaults to `https://stage.craftlyai.app`
- Can be overridden via `NEXT_PUBLIC_APP_URL` environment variable

### 3. **Deployment**

#### For Staging/Beta (Default):
No environment variables needed - defaults to staging:
```bash
# Deploy to Vercel
vercel
# or
vercel --prod
```

#### For Production:
Set environment variable in Vercel dashboard:
```env
NEXT_PUBLIC_APP_URL=https://craftlyai.com
```

## Vercel Deployment Steps

1. **Deploy to Staging:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect settings
   - No environment variables needed (defaults to staging)
   - Add custom domain: `stage.craftlyai.app`
   - Deploy!

2. **Deploy to Production (later):**
   - In Vercel project settings
   - Go to "Environment Variables"
   - Add: `NEXT_PUBLIC_APP_URL` = `https://craftlyai.com`
   - Redeploy

## URLs Updated

✅ **OpenGraph URLs** - Uses `NEXT_PUBLIC_APP_URL`  
✅ **Twitter Card Images** - Uses `NEXT_PUBLIC_APP_URL`  
✅ **Default URL** - Set to `https://stage.craftlyai.app`  
✅ **Configuration** - Environment variable driven

## Testing

After deployment to `stage.craftlyai.app`, verify:
- ✅ OpenGraph metadata shows staging URL
- ✅ Social sharing uses staging URL
- ✅ All image URLs point to staging domain

## Notes

- Email addresses (e.g., `hello@craftlyai.com`) are not changed - these remain the same
- The configuration is environment-aware and can be changed per deployment
- Production builds will use production URL when `NEXT_PUBLIC_APP_URL` is set
