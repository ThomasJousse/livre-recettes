# Livre de recettes — notes pour Claude

App Android perso (Capacitor 8, sans framework JS). Données : Google Sheet privé « Livre de recettes » (onglets Recettes, Ingrédients, Étapes, Catalogue) lu via un script Apps Script autonome (« Projet sans titre » / API Livre de recettes) protégé par une clé.

## Mettre à jour
- **Recettes** : modifier le Sheet (connecteur Google Sheets). Aucun build nécessaire.
- **Versions simplifiée / authentique** : deux lignes dans l'onglet Recettes ; la ligne authentique porte l'`id` de la simplifiée dans la colonne `variante_de` (et le tag `authentique`). L'app les réunit en une seule fiche avec un sélecteur Simplifiée/Authentique ; le menu et la liste de courses utilisent la version sélectionnée.
- **Code** : modifier `www/` (index.html = toute l'app, native.js = couche Android), augmenter `version` dans `package.json`, pousser sur `main`. Le workflow `.github/workflows/release.yml` compile l'APK signé et publie la Release `vX.Y.Z` ; l'app installée propose la mise à jour au lancement.
- Ne jamais pousser de tag (refusé par le proxy) : la Release crée le tag côté GitHub.

## Secrets
- Un seul secret GitHub : `APP_SECRETS` (JSON : api, key, sheet, kspass, keystore base64).
- Sauvegarde complète (code + clé de signature + secrets) sur le Drive du propriétaire, dossier Claude : « Livre de recettes - sauvegarde app (…).zip ». Sans cette clé de signature, impossible de mettre à jour l'app par-dessus.
- Ne jamais committer `config.local.json`, `*.jks`, `apps-script/Code.gs`.

## Build local (si besoin)
`npm ci && node scripts/build.mjs && npx cap sync android && cd android && KEYSTORE_FILE=… KEYSTORE_PASSWORD=… ./gradlew assembleRelease`
(Android SDK 36, JDK 21 ; Maven Central peut renvoyer des 429 : relancer avec `--max-workers=1`.)
