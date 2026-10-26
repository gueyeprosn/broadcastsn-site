#!/usr/bin/env bash
# Génère les vhosts nginx depuis nginx/*.tpl en y injectant le domaine de site.env.
# Sortie dans build/. Idempotent, ne touche à rien d'installé.
set -euo pipefail
cd "$(dirname "$0")"

# shellcheck disable=SC1091
. ./site.env
[ -n "${DOMAIN:-}" ] || { echo "DOMAIN vide dans site.env" >&2; exit 1; }

SERVER_NAMES="$DOMAIN${ALT_NAMES:+ $ALT_NAMES}"
mkdir -p build

for tpl in nginx/*.tpl; do
  out="build/$(basename "$tpl" .tpl)"
  sed -e "s|__SERVER_NAMES__|$SERVER_NAMES|g" -e "s|__DOMAIN__|$DOMAIN|g" "$tpl" > "$out"
  echo "généré : $out"
done

echo
echo "domaine canonique : $DOMAIN"
echo "server_name       : $SERVER_NAMES"
