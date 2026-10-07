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
| `NEXT_PUBLIC_API_BASE_URL` | `https://app.chicagominamidojo.com` |

`/events` then requests `https://app.chicagominamidojo.com/api/events/upcoming`. Event pages request `GET /api/events/{id}` and post RSVPs to `POST /api/events/{id}/signups`. Flyer image URLs are absolute on that same app host.

Copy [`.env.example`](.env.example) to `.env.local` for local development. Keep `NEXT_PUBLIC_API_BASE_URL=https://app.chicagominamidojo.com` unless you are pointing at a local Laravel server.

## Nginx

### SPA / static HTML routes

```nginx
location / {
    try_files $uri $uri/ $uri.html /index.html =404;
}
```

### Event detail deep links (static export)

Event pages are client-fetched from Laravel. Known IDs are prebuilt at deploy time; new events created after deploy still need a shell HTML file for direct URLs.

Serve the shell at `/events/0` for any missing numeric event path (browser URL stays `/events/{id}`; the client reads the id from the path and loads the API):

```nginx
location ~ ^/events/(?<event_id>[0-9]+)/?$ {
    try_files $uri $uri/ $uri.html /events/0/index.html /events/0.html =404;
}
```

Place this **before** the general `location /` block.

The browser calls the Laravel app directly. This site does not proxy `/api`.

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
3. Browser Network tab — `https://app.chicagominamidojo.com/api/events/upcoming` and `/api/events/{id}` return 200
4. `/events` lists upcoming events; `/events/{id}` loads detail + signup form
5. `ls $FORGE_SITE_PATH/out/events/0/index.html` (or `out/events/0.html`) — shell exists for Nginx fallback
