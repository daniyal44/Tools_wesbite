# 🚀 Production Deployment Guide

Zevylo is built with **Next.js 16** and can be deployed anywhere that supports Node.js or static export.

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

1. Connect your repository on the [Netlify Dashboard](https://app.netlify.com).
2. Configure build settings:
   - **Base directory**: `zevylo`
   - **Build command**: `npm run build`
   - **Publish directory**: `zevylo/.next`
3. In `zevylo/netlify.toml` (or Headers tab), ensure the COOP/COEP headers are applied.
4. Click **Deploy Site**.

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
