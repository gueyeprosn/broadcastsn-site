#!/usr/bin/env bash
# Rebuild + redémarrage du site broadcastsn.com.
# N'affecte aucun service du NOC : nginx n'est pas touché, seul ce conteneur redémarre.
set -euo pipefail
cd "$(dirname "$0")"

docker compose build
docker compose up -d
docker compose ps
