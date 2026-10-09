# Deployment Guide: SQUID HUNT THE FINAL 2

This document provides step-by-step instructions for deploying your React application to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All animations work correctly in production build
- [ ] Images are optimized and compressed
- [ ] Environment variables are configured (if any)
- [ ] Build completes without errors: `npm run build`
- [ ] Preview works locally: `npm run preview`
- [ ] All links are functional
- [ ] Accessibility features tested

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration for Vite projects
- Automatic HTTPS
- Global CDN
- Free tier available

**Steps:**

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

3. **Or deploy via GitHub**:
   - Push your code to GitHub
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

**Build Settings** (auto-detected):
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### Option 2: Netlify

**Why Netlify?**
- Drag-and-drop deployment
- Form handling
- Split testing support

**Steps:**

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Drag-and-drop**:
   - Visit [app.netlify.com](https://app.netlify.com)
   - Drag the `dist/` folder to the upload zone

3. **Or connect GitHub**:
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

**Create `netlify.toml`** (optional, for SPA routing):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Why GitHub Pages?**
- Free for public repos
- Simple setup

**Steps:**

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**:
   ```json
   {
     "homepage": "https://<username>.github.io/<repo-name>",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.ts`**:
   ```typescript
   export default defineConfig({
     base: '/<repo-name>/',
     plugins: [react(), tailwindcss()],
   });
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`

---

### Option 4: Cloudflare Pages

**Why Cloudflare Pages?**
- Global CDN with 300+ locations
- Unlimited bandwidth
- Free SSL

**Steps:**

1. Push code to GitHub/GitLab
2. Visit [pages.cloudflare.com](https://pages.cloudflare.com)
3. Click "Create a project"
4. Connect your repository
5. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click "Save and Deploy"

---

## 🔧 Build Optimization Tips

### 1. Code Splitting
Vite automatically code-splits. Verify in build output:
```
dist/assets/index-[hash].js   487 kB
```

### 2. Image Optimization
Install `vite-plugin-imagemin`:
```bash
npm install --save-dev vite-plugin-imagemin
```

Add to `vite.config.ts`:
```typescript
import { imagetools } from 'vite-plugin-imagetools';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
  ],
});
```

### 3. Analyze Bundle Size
```bash
npm run build -- --mode analyze
```

Or use:
```bash
npm install --save-dev rollup-plugin-visualizer
```

### 4. Enable Compression
Most platforms (Vercel, Netlify) auto-enable gzip/brotli. Verify with:
```bash
curl -I -H "Accept-Encoding: gzip" https://your-site.com
```

---

## 🌍 Environment Variables

If you need environment variables (e.g., API keys):

1. **Create `.env.production`**:
   ```
   VITE_API_URL=https://api.example.com
   ```

2. **Access in code**:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. **Configure in hosting platform**:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Build & deploy → Environment
   - **Cloudflare**: Settings → Environment Variables

**Important**: All Vite env vars must start with `VITE_`

---

## 🔍 Post-Deployment Verification

After deployment, test:

1. **Performance**:
   - Run [PageSpeed Insights](https://pagespeed.web.dev/)
   - Target: 90+ score

2. **Animations**:
   - Verify hero intro plays correctly
   - Check scroll-triggered animations
   - Test reduced motion mode

3. **Responsiveness**:
   - Mobile (375px, 414px)
   - Tablet (768px, 1024px)
   - Desktop (1440px, 1920px)

4. **Accessibility**:
   - Run [WAVE](https://wave.webaim.org/)
   - Check keyboard navigation
   - Test with screen reader

5. **Cross-Browser**:
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

---

## 🐛 Common Deployment Issues

### Issue: Blank page after deployment
**Solution**: Check browser console for errors. Often caused by incorrect `base` in `vite.config.ts`.

### Issue: Assets not loading (404)
**Solution**: Ensure `base: '/'` in `vite.config.ts` for root deployments.

### Issue: Animations not working
**Solution**: Verify Framer Motion and GSAP are in `dependencies`, not `devDependencies`.

### Issue: Tailwind styles missing
**Solution**: Ensure `@import "tailwindcss";` is in `src/index.css`.

---

## 📊 Monitoring & Analytics

### Add Google Analytics

1. **Install**:
   ```bash
   npm install react-ga4
   ```

2. **Initialize in `main.tsx`**:
   ```typescript
   import ReactGA from 'react-ga4';
   
   ReactGA.initialize('G-XXXXXXXXXX');
   ```

### Add Sentry (Error Tracking)

```bash
npm install @sentry/react
```

---

## 🔐 Security Headers

Add security headers via `netlify.toml` or Vercel config:

**Netlify:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

**Vercel (`vercel.json`):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

---

## 📞 Support

For deployment issues specific to your hosting platform:
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Netlify**: [netlify.com/support](https://netlify.com/support)
- **Cloudflare**: [community.cloudflare.com](https://community.cloudflare.com)

---

**Last Updated**: 2026-10-10  
**Build Version**: Vite 8.3.0 + React 19.2.8
