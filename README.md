# Livre de recettes — app Android

App perso (Capacitor) qui lit le Google Sheet « Livre de recettes » via un script Google Apps Script protégé par une clé. Le Sheet reste privé.

- **Nouvelles recettes** : ajouter les lignes dans le Sheet → visibles dans l'app après « Actualiser » (ou au prochain lancement).
- **Nouvelle version du code** : augmenter `version` dans `package.json` puis pousser sur `main` → GitHub Actions compile l'APK signé et le publie dans les Releases → l'app propose la mise à jour au lancement.

## Secrets GitHub nécessaires
Un seul : `APP_SECRETS` (JSON : api, key, sheet, kspass, keystore en base64). Une copie est rangée dans la sauvegarde privée du propriétaire.

## Structure
- `www/` : l'app (HTML/CSS/JS, sans framework)
- `www/native.js` : minuteurs en notification, bouton retour, mise à jour
- `apps-script/Code.template.gs` : script à coller dans le Sheet (Extensions > Apps Script)
- `android/` : projet Android généré par Capacitor
