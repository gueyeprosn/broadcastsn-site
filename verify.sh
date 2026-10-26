#!/usr/bin/env bash
# Vérifie que toutes les routes du site répondent, que les métadonnées sont en
# place et qu'aucun lien interne ne pointe dans le vide.
set -uo pipefail

BASE="${1:-https://sn.broadcastsn.com}"
fail=0

check() {
  local path="$1" expected="${2:-200}"
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$BASE$path")
  if [ "$code" = "$expected" ]; then
    printf '  OK    %-38s %s\n' "$path" "$code"
  else
    printf '  ECHEC %-38s %s (attendu %s)\n' "$path" "$code" "$expected"
    fail=$((fail + 1))
  fi
}

echo "=== Pages ==="
for p in / /services /realisations /secteurs /a-propos /contact /confidentialite; do
  check "$p"
done

echo "=== Pages de prestation ==="
for s in captation-multicamera diffusion-en-direct production-montage plateaux-tv ceremonies films-institutionnels; do
  check "/services/$s"
done

echo "=== SEO ==="
for p in /sitemap.xml /robots.txt; do check "$p"; done

echo "=== 404 ==="
check /page-qui-nexiste-pas 404

echo "=== Ressources ==="
check /brand/broadcast-sn-blanc.png
check /brand/broadcast-sn-noir.png
check /icon
check /apple-icon
check /opengraph-image
# Fichier de validation Google Search Console : ne jamais le supprimer.
check /google4e7da42451b1fd05.html

echo "=== Contenu ==="
html=$(curl -s --max-time 20 "$BASE/")
for needle in '<title>' 'og:title' 'og:image' 'canonical' 'application/ld+json' 'google-site-verification'; do
  if grep -q "$needle" <<<"$html"; then
    printf '  OK    %s présent\n' "$needle"
  else
    printf '  ECHEC %s absent\n' "$needle"
    fail=$((fail + 1))
  fi
done

echo
if [ "$fail" -eq 0 ]; then
  echo "Tout est vert."
else
  echo "$fail contrôle(s) en échec."
  exit 1
fi
