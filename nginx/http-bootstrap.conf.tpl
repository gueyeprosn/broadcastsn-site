# ---------------------------------------------------------------------------
# __DOMAIN__ — vhost HTTP, phase bootstrap (avant certificat).
# GÉNÉRÉ par render-vhosts.sh depuis nginx/http-bootstrap.conf.tpl — ne pas
# éditer la copie installée dans conf.d, elle sera écrasée.
# Sert le site en clair et expose le challenge ACME.
# ---------------------------------------------------------------------------
server {
    listen 80;
    listen [::]:80;
    server_name __SERVER_NAMES__;

    # Résolution dynamique : si le conteneur du site est arrêté, nginx démarre
    # quand même et renvoie 502 sur ce vhost seul — le NOC n'est pas affecté.
    resolver 127.0.0.11 valid=30s ipv6=off;
    resolver_timeout 5s;
    set $broadcastsn_base http://broadcastsn-web:3000;

    access_log /var/log/nginx/broadcastsn.access.log main;
    error_log  /var/log/nginx/broadcastsn.error.log warn;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
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
