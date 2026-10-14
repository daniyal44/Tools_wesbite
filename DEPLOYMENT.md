# 🚀 Production Deployment Guide

> **Live Production Website**: [https://zevylo.netlify.app/](https://zevylo.netlify.app/)  
> **Official Repository**: [https://github.com/daniyal44/Tools_wesbite](https://github.com/daniyal44/Tools_wesbite)

Zevylo is built with **Next.js 16** and is live on Netlify at [https://zevylo.netlify.app/](https://zevylo.netlify.app/).

---

## ⚠️ Critical Header Configuration (WebAssembly Support)

Tools using `@ffmpeg/ffmpeg` (WASM) require multi-threading support via `SharedArrayBuffer`. Browsers only allow `SharedArrayBuffer` when the site is served with specific security headers:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

This is already pre-configured in `zevylo/next.config.ts`. Ensure your reverse proxy or CDN does not strip these headers.

---

## 🌐 Deploy to Vercel (Recommended)

1. Import your GitHub repository into the [Vercel Dashboard](https://vercel.com/new).
2. Set the **Root Directory** to:
   ```
   zevylo
   ```
3. Set Framework Preset: **Next.js**
4. Build Command: `npm run build`
5. Output Directory: `.next`
6. Click **Deploy**.

---

## ⚡ Deploy to Netlify

Netlify configuration is fully pre-configured via [`netlify.toml`](netlify.toml) and [`zevylo/netlify.toml`](zevylo/netlify.toml) using the official `@netlify/plugin-nextjs`:

### Configuration Overview
- **Base directory**: `zevylo` (Handled automatically by root `netlify.toml`)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Plugin**: `@netlify/plugin-nextjs`
- **WebAssembly Headers**: Injected automatically for all routes (`Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy: require-corp`)

### Troubleshooting Netlify 404 ("Page Not Found"):
If you linked the repository before `netlify.toml` was added:
1. Go to your **Netlify Site Dashboard** -> **Site configuration** -> **Build & deploy** -> **Build settings**:
   - **Base directory**: `zevylo` (or leave empty if using root `netlify.toml`)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
2. Go to the **Deploys** tab -> Click **Trigger deploy** -> **Clear cache and deploy site**.
3. Netlify will detect `netlify.toml` and `@netlify/plugin-nextjs`, build all 586 pages, and serve the site live at `https://zevylo.netlify.app/`.

---

## 🐳 Docker Deployment

You can containerize and run Zevylo on any VPS, Kubernetes cluster, or cloud VM using Docker:

### `Dockerfile` (Save in `zevylo/Dockerfile`):
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Build & Run:
```bash
cd zevylo
docker build -t zevylo-tools .
docker run -p 3000:3000 zevylo-tools
```

---

## 🖥️ Self-Hosting on VPS (Ubuntu / Debian + Nginx + PM2)

### 1. Install Dependencies & Build
```bash
git clone https://github.com/daniyal44/Tools_wesbite.git
cd Tools_wesbite/zevylo
npm install
npm run build
```

### 2. Run with PM2
```bash
npm install -g pm2
pm2 start npm --name "zevylo" -- run start -- -p 3000
pm2 save
pm2 startup
```

### 3. Nginx Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name tools.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # WebAssembly Multi-threading headers
        add_header Cross-Origin-Opener-Policy "same-origin" always;
        add_header Cross-Origin-Embedder-Policy "require-corp" always;
    }
}
```
Certbot can then be used to generate free SSL certificates:
```bash
sudo certbot --nginx -d tools.yourdomain.com
```
