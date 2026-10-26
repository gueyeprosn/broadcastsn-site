#!/usr/bin/env bash
# Active HTTPS sur le domaine défini dans site.env, une fois le DNS pointé ici.
#   1. vérifie que chaque nom résout vers l'IP publique de la machine
#   2. vérifie que le challenge ACME est réellement servi depuis l'extérieur
#   3. demande le certificat Let's Encrypt (webroot servi par le nginx du NOC)
#   4. installe le vhost 443, bascule le vhost 80 en redirection, recharge
#      nginx à chaud (aucune coupure des flux de diffusion)
#
# Si « nginx -t » échoue, l'état précédent est restauré et aucun rechargement
# n'a lieu : le NOC ne peut pas être cassé par ce script.
set -euo pipefail
cd "$(dirname "$0")"

# shellcheck disable=SC1091
. ./site.env
DOMAINS="$DOMAIN${ALT_NAMES:+ $ALT_NAMES}"
EMAIL="${CERTBOT_EMAIL:-broadcast.dkr@gmail.com}"
CONF_DIR=/root/mini-noc-broadcast/config/nginx/conf.d
NGINX_CTN=mini-noc-broadcast-nginx-1
HTTP_CONF="$CONF_DIR/site-broadcastsn.com.conf"
SSL_CONF="$CONF_DIR/site-broadcastsn.com.ssl.conf"

./render-vhosts.sh >/dev/null

# --- 1. DNS propagé, sinon on brûle le quota Let's Encrypt ---
SERVER_IP=$(curl -s -4 --max-time 10 ifconfig.me)
[ -n "$SERVER_IP" ] || { echo "IP publique introuvable" >&2; exit 1; }
resolvectl flush-caches 2>/dev/null || true

for host in $DOMAINS; do
  resolved=$(dig +short +time=3 +tries=2 A "$host" @1.1.1.1 2>/dev/null | grep -E '^[0-9.]+$' | head -1 || true)
  if [ "$resolved" != "$SERVER_IP" ]; then
    echo "DNS pas prêt : $host résout vers '${resolved:-rien}' au lieu de $SERVER_IP" >&2
    echo "Attends la propagation, puis relance ce script." >&2
    exit 1
  fi
  echo "DNS OK : $host -> $SERVER_IP"
done

# --- 2. le challenge ACME doit être joignable depuis Internet ---
TOKEN="precheck-$(date +%s)"
docker run --rm -v mini-noc-broadcast_certbot_www:/w alpine \
  sh -c "mkdir -p /w/.well-known/acme-challenge && printf '%s' '$TOKEN' > /w/.well-known/acme-challenge/$TOKEN"
FAILED=""
for host in $DOMAINS; do
  GOT=$(curl -s --max-time 15 "http://$host/.well-known/acme-challenge/$TOKEN" || true)
  if [ "$GOT" = "$TOKEN" ]; then echo "Challenge ACME joignable sur http://$host"; else FAILED="$FAILED $host"; fi
done
docker run --rm -v mini-noc-broadcast_certbot_www:/w alpine rm -f "/w/.well-known/acme-challenge/$TOKEN"
if [ -n "$FAILED" ]; then
  echo "Challenge ACME non servi sur :$FAILED" >&2
  echo "Vérifie que le port 80 est joignable depuis Internet pour ces noms." >&2
  exit 1
fi

# --- 3. certificat ---
CERT_ARGS=""
for host in $DOMAINS; do CERT_ARGS="$CERT_ARGS -d $host"; done
# shellcheck disable=SC2086
docker run --rm \
  -v mini-noc-broadcast_certbot_www:/var/www/certbot \
  -v mini-noc-broadcast_certbot_certs:/etc/letsencrypt \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  --cert-name "$DOMAIN" $CERT_ARGS \
  --email "$EMAIL" --agree-tos --no-eff-email --non-interactive

# --- 4. bascule des vhosts, restauration si nginx -t échoue ---
BACKUP=$(mktemp -d)
trap 'rm -rf "$BACKUP"' EXIT
cp "$HTTP_CONF" "$BACKUP/http.conf"

cp build/https.conf "$SSL_CONF"
cp build/http-redirect.conf "$HTTP_CONF"

if ! docker exec "$NGINX_CTN" nginx -t; then
  echo "Config nginx invalide : restauration, rien n'a été rechargé." >&2
  cp "$BACKUP/http.conf" "$HTTP_CONF"
  rm -f "$SSL_CONF"
  exit 1
fi

docker exec "$NGINX_CTN" nginx -s reload
echo "nginx rechargé"

# Le rechargement est gracieux : les nouveaux workers mettent un instant à
# accepter les connexions. Sans cette attente, le contrôle renvoie 000 et
# signale un échec alors que tout va bien.
CODE=000
for _ in 1 2 3 4 5 6; do
  sleep 2
  CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://$DOMAIN/" || true)
  [ "$CODE" = "200" ] && break
done
echo "HTTPS : https://$DOMAIN/ -> code $CODE"
[ "$CODE" = "200" ] || { echo "Code inattendu, voir /var/log/nginx/broadcastsn.error.log" >&2; exit 1; }
