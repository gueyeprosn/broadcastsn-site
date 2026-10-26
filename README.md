# sn.broadcastsn.com — Site Broadcast Senegal

Site corporate de **Broadcast Senegal** (Broadcast SN), structure audiovisuelle
basée à Dakar. Next.js 15 + TypeScript + Tailwind, servi en HTTPS derrière le
nginx du NOC.

En ligne : **https://sn.broadcastsn.com/**

---

## 1. Direction artistique

Palette reprise du brief pour les neutres, **accent repris du logo réel** :

| Rôle | Valeur | Origine |
|---|---|---|
| Noir profond | `#08090B` | brief |
| Anthracite | `#15171B` | brief |
| Blanc cassé | `#F4F3EF` | brief |
| Gris secondaire | `#9297A1` | brief |
| **Accent** | **`#FFC909`** | **extrait du logo fourni** |
| Encre du mot-mark | `#231F20` | extrait du logo fourni |

> **Écart assumé par rapport au brief.** Le brief demandait un accent orange
> `#FF5B35`. Le logo officiel est jaune `#FFC909` avec les couleurs du drapeau
> sénégalais : les deux teintes placées côte à côte se seraient disputées, et le
> logo aurait perdu. L'accent est donc le jaune de la marque. Pour revenir à
> l'orange : une seule valeur à changer dans `app/tailwind.config.ts`
> (`colors.accent.DEFAULT`), tout le site suit.

Typographie : **Anton** (capitales condensées) pour les titres, **Inter** pour
le texte, **JetBrains Mono** pour les étiquettes techniques — toutes chargées
via `next/font` (auto-hébergées au build, aucun appel à Google au runtime).

### Style « industriel » (depuis le 2026-10-24)

Inspiré d'une maquette de référence fournie par le propriétaire : fond clair,
bandeaux sombres, grands titres en capitales condensées terminés par un point
carré jaune, sur-titres techniques (`+ —— LIBELLÉ`), prestations numérotées,
angles vifs.

- **Thème par variables CSS** (`app/globals.css`) : le site est clair par
  défaut ; toute section portant la classe `theme-dark` s'inverse d'elle-même.
- **Le jaune n'est jamais utilisé comme couleur de texte sur fond clair**
  (contraste 1,4:1). Il sert de fond (boutons, surlignage `.mark`, point final
  `.dot`) avec du texte noir. Le texte d'accent (`text-signal`) est un ambre
  foncé `#7A5800` sur fond clair (5,9:1) et redevient jaune dans les bandeaux
  sombres.
- Les repères chiffrés de la maquette (surface, nombre de machines…) ont été
  remplacés par des faits établis par le site (6 prestations, Sénégal entier,
  devis sur mesure) et par les engagements de service : aucun chiffre inventé.
- La photo principale de l'accueil est une vraie photo de terrain, avec un
  cartouche technique superposé comme sur la maquette.

---

## 2. Installation et développement

```bash
cd app
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # vérification TypeScript
npm run build        # build de production
```

Node 22 ou supérieur.

## 3. Déploiement

```bash
./deploy.sh          # rebuild de l'image + redémarrage du conteneur
```

Ne touche que le conteneur `broadcastsn-web`. nginx n'est pas rechargé et la
chaîne de diffusion du NOC n'est pas concernée.

## 4. Arborescence

```
app/
  app/                 routes (App Router)
    page.tsx           accueil, sections A à H
    services/          liste + page de détail par prestation
    realisations/      galerie filtrable
    secteurs/          secteurs d'activité
    a-propos/          approche, engagements, méthode
    contact/           formulaire de devis
    confidentialite/   politique de confidentialité
    api/devis/         réception du formulaire (POST)
    sitemap.ts         sitemap.xml
    robots.ts          robots.txt
    not-found.tsx      404
  components/          composants réutilisables
  lib/
    site.ts            identité + COORDONNÉES À COMPLÉTER
    services.ts        les 9 prestations, en deux métiers (production
                       événementielle / ingénierie broadcast)
    content.ts         secteurs, engagements, méthode, PORTFOLIO À REMPLIR
    validation.ts      validation du formulaire (client + serveur)
    intake.ts          enregistrement des demandes
```

---

## 5. Formulaire de devis — fonctionnement réel

Le formulaire **enregistre réellement** les demandes. Il n'affiche une
confirmation que si le serveur a confirmé l'enregistrement : si rien n'a pu être
écrit, il l'annonce au lieu de laisser croire que la demande est partie.

Deux canaux de réception, par ordre de priorité :

| Variable | Effet |
|---|---|
| `DEVIS_WEBHOOK_URL` | POST JSON vers un service externe (n8n, Make, Zapier, Slack…) |
| `DEVIS_STORE_PATH` | Fichier JSONL (défaut : `/data/devis.jsonl`, volume `devis_data`) |

Par défaut, sans configuration, les demandes sont écrites dans le volume
`devis_data`. Pour les consulter :

```bash
docker compose exec web cat /data/devis.jsonl
```

Pour router vers un webhook, ajouter dans `docker-compose.yml` sous
`environment:` :

```yaml
      DEVIS_WEBHOOK_URL: "https://votre-service/endpoint"
```

Si ni le webhook ni le fichier ne sont accessibles, la page de contact affiche
d'elle-même un bandeau « formulaire en mode démonstration » et aucune
confirmation n'est jamais donnée.

**Protections en place** : validation côté serveur (seule à faire foi), piège à
robots invisible, limitation à 5 envois par IP par quart d'heure, bornage de la
longueur de tous les champs.

### Alerte par courriel

En plus de l'enregistrement, chaque demande peut déclencher un courriel
d'alerte (SMTP, `lib/notify.ts`). Le bouton « Répondre » du courriel écrit
directement au demandeur.

```bash
cp mail.env.example mail.env && chmod 600 mail.env   # puis renseigner
./deploy.sh                                          # prise en compte
./test-mail.sh                                       # courriel de test
```

L'alerte part **après** l'enregistrement et sans faire attendre le visiteur :
si le serveur de messagerie est en panne, la demande reste dans le dépôt et
l'échec apparaît dans `docker compose logs web` (`[devis] alerte courriel non
envoyée`). `mail.env` contient un mot de passe : il n'est jamais versionné.
Sans ce fichier, le site fonctionne comme avant, sans alerte.

---

## 5 bis. Deux métiers (depuis le 2026-10-26)

| Métier | Public | Prestations |
|---|---|---|
| Production événementielle | Entreprises, institutions, organisations | Captation multicaméra, diffusion en direct, production et montage, plateaux TV, cérémonies, films institutionnels |
| Ingénierie broadcast | Chaînes de télévision, web TV, radios | Audit technique, architecture technique et devis, accompagnement technique |

Le métier est porté par le champ `group` de chaque prestation (`lib/services.ts`).
Les prestations d'ingénierie ont un champ `deliverables` (« Ce que vous
recevez »). Présentation inspirée de la page services de DM Broadcast (structure
numérotée et livrables), sans reprise de texte.

- [ ] **À valider par le propriétaire** : le périmètre rédigé pour ces trois
      prestations (notamment « réception, mise en service et tests avant
      antenne » et « formation des équipes » dans l'accompagnement).

## 6. À COMPLÉTER par le propriétaire avant publication

Rien de ce qui suit n'a été inventé. Ces champs sont volontairement vides et le
site s'adapte à leur absence.

### Coordonnées — `app/lib/site.ts`, objet `contact`

- [x] `email` — `contact@broadcastsn.com` (confirmé le 2026-10-26)
- [ ] `phone` — téléphone avec indicatif (`+221 …`)
- [x] `whatsapp` — `+221 77 724 56 54` (confirmé le 2026-10-26) : bouton
      flottant sur toutes les pages (`components/WhatsAppButton.tsx`), pied de
      page et page Contact
- [ ] `address` — adresse postale à Dakar

Tant qu'une valeur vaut `null`, la ligne correspondante n'apparaît pas. La page
Contact affiche alors une mention expliquant que les coordonnées seront publiées
une fois confirmées.

### Réseaux sociaux — `app/lib/site.ts`, tableau `socials`

- [ ] Uniquement des comptes **officiels confirmés**, au format
      `{ label: 'LinkedIn', href: 'https://…' }`

### Réalisations — `app/lib/content.ts`, tableau `projects`

Quatre projets publiés le 2026-10-26, fournis par le propriétaire. Trois sont
**recoupés** publiquement (vidéo vérifiée : titre et chaîne) ; l'Afrik Impact
Summit est publié sur **confirmation écrite** du propriétaire, avec ses photos.

| Projet | Vérification |
|---|---|
| Afrik Impact Summit — African Leadership Group, Denver (USA), 2023-2024 | Confirmé par écrit par le propriétaire ; logos ALG / Afrik Impact sur ses photos (`images/alg/`) ; lien vers la chaîne YouTube officielle d'ALG |
| Sports Business Forum — Atlantic Council Africa Center / SEED Project, 4 mars 2022 | Vidéo sur la chaîne Atlantic Council ; logos identiques sur la photo `8.jpg` (et le montage `13.png`) |
| Rencontres Santé Numérique 2021 — Amref Health Africa, Dakar, 1er-2 déc. 2021 | Vidéo sur la chaîne Amref Health Africa (France). Aucune photo maison identifiée : la fiche montre la miniature YouTube |
| Forum de Dakar #2 — 2021 | Vidéo publiée par **Phrenos EU** ; habillage « Dakar #2 » visible sur le montage `13.png` |

- [ ] **Forum de Dakar #2 : client à confirmer.** La proposition reçue indiquait
      « Afrika Innovation », mais la vidéo est publiée par Phrenos EU : la fiche
      ne cite aucun client tant que ce n'est pas tranché.
- [x] Confirmés par écrit le 2026-10-26 et publiés : Afrik Impact Summit,
      ancienneté « 14 ans » (`site.experience`), « Sénégal et États-Unis »
      (`site.countries`).
- La fiche « délégation du Colorado au Sénégal » a été **retirée à la
  demande du propriétaire** (2026-10-26) : ne pas la remettre sans son accord.
- [ ] Une photo maison des Rencontres Santé Numérique, si elle existe.

### Décisions éditoriales à valider

- [ ] **Signature de marque.** « Nous donnons une image à vos événements. » est
      une proposition du brief. Le logo porte déjà « Professionnel des nouveaux
      médias », utilisé comme baseline. Trancher laquelle fait référence.
- [ ] **Accent couleur** : jaune du logo (en place) ou orange `#FF5B35` du brief.
- [ ] **Raison sociale exacte** et mentions légales (registre de commerce, NINEA)
      si elles doivent figurer au pied de page.

### Visuels

- [x] Photographies de terrain fournies le 2026-10-24 (dossier `images/`),
      intégrées dans `app/public/photos/` sous des noms explicites : photo
      principale de l'accueil, une photo par prestation (`lib/services.ts`,
      champ `image`), page À propos et section « Sur le terrain » de l'accueil.
      `next/image` les sert redimensionnées en WebP/AVIF.
      Écartés : les deux planches-montages (`13.png`, `Plan de travail 1.png`),
      les logos (déjà en place) et `Image_AI copie.jpg` (nom évoquant une
      retouche par IA ; `11.jpg` montre la même régie).
- [ ] Page Réalisations : toujours vide. Les photos montrent des équipes au
      travail, pas des projets identifiés (client, date, livrable) : ne pas les
      y présenter comme des références sans ces informations.
- [x] Image Open Graph (1200×630) : générée au build depuis le logo et les
      textes de `lib/site.ts` (`app/opengraph-image.tsx`). La remplacer par une
      photo de production réelle quand il y en aura une.

---

## 7. Fonctionnalités en mode démonstration

| Élément | État |
|---|---|
| Réalisations | 3 projets vérifiés, avec lien vers la vidéo publique de chacun (voir section 6) |
| Cadres visuels | Remplacés par des photos de terrain réelles (accueil, prestations, À propos). Le motif « Visuel d'illustration » ne reste que sur la page Réalisations, vide |
| Coordonnées directes | Masquées tant que non renseignées |
| Réseaux sociaux | Masqués tant qu'aucun compte officiel n'est confirmé |
| Vidéo de fond du hero | Non utilisée : aucune vidéo libre de droits fournie. Composition éditoriale à la place |
| Version anglaise | Non réalisée. Les textes sont centralisés dans `lib/`, ce qui permettra de l'ajouter sans refonte |

## 8. Ce qui n'a volontairement pas été écrit

Conformément au brief, le site ne contient **aucun** : témoignage,
nombre d'années d'expérience, certification, prix, chiffre de performance,
inventaire de matériel, ni effectif d'équipe permanente. Les clients et projets
cités (page Réalisations) sont ceux fournis par le propriétaire **et** vérifiés
publiquement ; aucun autre n'est mentionné.

Les prestations décrivent un **périmètre d'intervention**, jamais des moyens
techniques qui n'ont pas été confirmés. Les engagements sont présentés comme des
engagements de service, pas comme des résultats démontrés.

## 9. SEO — référencement Google

### Sur le site (fait le 2026-10-26)

- Titre et description **orientés recherche** pour chaque prestation, distincts du
  titre éditorial affiché (`lib/services.ts`, champ `seo`) : métier + lieu
  (« Captation vidéo multicaméra à Dakar et au Sénégal », « Diffusion en direct
  et live streaming au Sénégal », « Audit technique de régie TV, studio radio et
  web TV »…). Pages principales retitrées de la même façon.
- Données structurées : `Organization` + `ProfessionalService` sur toutes les
  pages (prestations, zones Sénégal / États-Unis, contact e-mail + WhatsApp),
  `Service` et `BreadcrumbList` sur chaque page de prestation
  (`components/StructuredData.tsx`). **Toujours sans adresse postale** tant
  qu'elle n'est pas confirmée.
- `sitemap.xml` (16 URL), `robots.txt`, balises canoniques, Open Graph.
- **Google Search Console : site validé par fichier HTML** (2026-10-26).
  `app/public/google4e7da42451b1fd05.html` est servi à la racine du site.
  **Ne jamais le supprimer ni le renommer** : Google revérifie régulièrement sa
  présence, et la propriété est perdue sinon. `verify.sh` le contrôle.
  La méthode « balise HTML » est aussi en place (`site.googleSiteVerification`
  dans `lib/site.ts`, balise `google-site-verification` sur toutes les pages) :
  ne pas la retirer non plus.

### Hors du site — à faire par le propriétaire

- [x] **Google Search Console** : propriété `https://sn.broadcastsn.com/`
      validée le 2026-10-26. Reste à soumettre
      `https://sn.broadcastsn.com/sitemap.xml`, demander l'indexation de l'accueil.
- [ ] **Fiche Google Business Profile** (Google Maps) : entreprise « zone
      desservie » Dakar / Sénégal, catégorie production vidéo, site, WhatsApp.
- [ ] **broadcastsn.com et www** ne répondent pas : redirection permanente (301)
      vers `https://sn.broadcastsn.com` à configurer chez Hostinger.
- [ ] Liens entrants : pages LinkedIn / Facebook de l'entreprise pointant vers
      le site ; crédit « Captation : Broadcast SN » avec lien chez les clients.

## 10. Accessibilité et performance

- Navigation complète au clavier, lien d'évitement vers le contenu
- `prefers-reduced-motion` respecté : toutes les animations sont neutralisées
- Attributs ARIA sur le menu mobile, les filtres et le formulaire
- Erreurs de formulaire reliées aux champs par `aria-describedby`
- Aucun débordement horizontal, testé jusqu'à 320 px de large
- Police auto-hébergée, images optimisées par `next/image`, sortie `standalone`
