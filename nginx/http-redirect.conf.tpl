# ---------------------------------------------------------------------------
# __DOMAIN__ — vhost HTTP, phase post-TLS.
# GÉNÉRÉ par render-vhosts.sh depuis nginx/http-redirect.conf.tpl.
# Ne garde que le challenge ACME (nécessaire aux renouvellements) et renvoie
# tout le reste vers https://__DOMAIN__.
# ---------------------------------------------------------------------------
server {
    listen 80;
    listen [::]:80;
    server_name __SERVER_NAMES__;

    access_log /var/log/nginx/broadcastsn.access.log main;
    error_log  /var/log/nginx/broadcastsn.error.log warn;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://__DOMAIN__$request_uri;
    }
}
