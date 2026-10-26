#!/usr/bin/env bash
# Envoie un courriel de test avec la configuration de mail.env (conteneur en marche).
# N'écrit aucune demande dans le dépôt des devis.
set -euo pipefail
cd "$(dirname "$0")"
docker compose exec -T web node scripts/test-mail.mjs
