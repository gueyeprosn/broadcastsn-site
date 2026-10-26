# ---------------------------------------------------------------------------
# __DOMAIN__ — vhost HTTPS.
# GÉNÉRÉ par render-vhosts.sh depuis nginx/https.conf.tpl.
# Installé dans conf.d par enable-tls.sh une fois le certificat délivré.
# ---------------------------------------------------------------------------
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name __SERVER_NAMES__;

    resolver 127.0.0.11 valid=30s ipv6=off;
    resolver_timeout 5s;
    set $broadcastsn_base http://broadcastsn-web:3000;

    ssl_certificate     /etc/letsencrypt/live/__DOMAIN__/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/__DOMAIN__/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    access_log /var/log/nginx/broadcastsn.access.log main;
    error_log  /var/log/nginx/broadcastsn.error.log warn;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Assets immuables du build Next.js (hash dans le nom de fichier).
    location /_next/static/ {
        proxy_pass $broadcastsn_base$request_uri;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }

    location / {
        proxy_pass $broadcastsn_base$request_uri;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }
}
