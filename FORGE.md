# Laravel Forge deployment (Next.js static export)

## Site settings

| Setting | Value |
|---------|--------|
| Project type | Static HTML |
| Web directory | `/out` |
| Branch | `main` |

## Deploy script

```bash
cd $FORGE_SITE_PATH

git pull origin $FORGE_SITE_BRANCH

npm ci --no-audit --no-fund
npm run build
```

Forge writes the **Environment** tab values to `.env` before the deploy script runs. `npm run build` inlines `NEXT_PUBLIC_*` variables into the static bundle.

## Environment (Forge dashboard)

| Variable | Production value |
|----------|------------------|
| `NEXT_PUBLIC_API_BASE_URL` | Leave empty when Nginx proxies `/api` on the same host |

For local development against production API, copy [`.env.example`](.env.example) to `.env.local` and set `NEXT_PUBLIC_API_BASE_URL=https://chicagominamidojo.com`.

## Nginx

### SPA / static HTML routes

```nginx
location / {
    try_files $uri $uri/ $uri.html /index.html =404;
}
```

### API proxy to Laravel

```nginx
location /api {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Adjust `proxy_pass` to match how Laravel runs on your server.

### Static assets (optional)

```nginx
location ~* \.(?:js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico|avif)$ {
    expires 1y;
    access_log off;
    add_header Cache-Control "public, immutable";
}
```

## Redirects

`/classes` and `/login` are client redirect pages in [`src/app/classes/page.tsx`](src/app/classes/page.tsx) and [`src/app/login/page.tsx`](src/app/login/page.tsx). For instant HTTP redirects, add Nginx rules:

```nginx
location = /classes {
    return 301 /;
}

location = /login {
    return 302 https://chicagominamidojo.com/login;
}
```

## Verify after deploy

1. `cat $FORGE_SITE_PATH/.env` — environment variables present
2. `ls $FORGE_SITE_PATH/out/index.html` — build output exists
3. Browser Network tab — `/api/site-content/*` and `/api/events/upcoming` return 200 or fall back to defaults
