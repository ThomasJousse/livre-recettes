# Règles de choix et de rédaction des recettes

Ce fichier s'applique à toute recette ajoutée ou modifiée dans le Livre de recettes (Google Sheet « Livre de recettes » et app). **À relire avant de proposer ou générer une recette.**

## 1. Ingrédients interdits

| Interdit | Remplacer par / remarque |
|---|---|
| **Champignons** (toutes sortes, y compris shiitake, champignons noirs, de Paris) | Les retirer. Si la recette d'origine en contient, le dire dans l'astuce. |
| **Petits pois** (même « facultatifs ») | Retirer, ou remplacer par un autre légume (carotte, poivron, haricot vert, épinards). |
| **Pois chiches** (secs, en boîte, farine incluse) | Haricots blancs ou rouges secs, ou lentilles. |
| **Fèves** | Un autre haricot (blanc, rouge, noir, borlotti). |

## 2. Alcool

- **L'alcool est gardé partout où la recette en contient normalement**, qu'il s'agisse d'une version simplifiée, authentique ou unique (vin, bière, saké, mirin, vin de Shaoxing…). On ne le retire pas.
- **Une alternative sans alcool est toujours proposée en note**, à deux endroits :
  - dans la colonne `note` de l'ingrédient (ex. « sans alcool : même quantité de bouillon ») ;
  - dans l'astuce de la recette (« Sans alcool : remplace … par … »).
- Remplacements de référence :

| Alcool | Alternative sans alcool |
|---|---|
| Vin blanc | Même quantité de bouillon (+ un filet de citron ou de vinaigre) |
| Vin rouge | Bouillon de bœuf + 1 c. à s. de vinaigre balsamique, ou jus de raisin |
| Bière | Bouillon + 1 c. à c. de sucre |
| Vin de Shaoxing | Même quantité de bouillon ou d'eau |
| Saké | Même quantité d'eau |
| Mirin | Eau + sucre (≈ 1 c. à c. de sucre pour 1 c. à s. d'eau) |

## 3. Contraintes de cuisine

- **Pas de four.** Uniquement plaque de cuisson (cocotte, sauteuse, wok) et **air fryer**. L'air fryer remplace le four, le gril et la friture.
- Pas de préparation fastidieuse : pas de parage ni de désossage de viande, pas de dessalage. Préférer les morceaux vendus prêts (cubes, hauts de cuisse désossés, haché, lanières).
- Plats en sauce privilégiés, faciles et **économiques** (référence prix : Lidl ; courses aussi chez Carrefour, Aldi, Grand Frais).
- **Portions de base : 6** (pour avoir un reste le lendemain).

## 4. Légumineuses

- Le foyer veut **plus de légumineuses** : haricots rouges, blancs, noirs, borlotti, lentilles, soja/tofu. Les haricots verts ne comptent pas.
- **Haricots toujours achetés secs**, avec une étape de trempage la veille. Jamais de haricots en boîte comme ingrédient.
- **Pas de recettes « tout en boîte »** (assemblage de conserves).
- **Pas de cuisson de haricots secs en grande quantité** dans les nouvelles recettes.
- Les lentilles corail sont la seule légumineuse sèche « express » (sans trempage, 15 min).

## 5. Versions simplifiée / authentique

- Une version authentique porte le tag `authentique`, et sa colonne `variante_de` (onglet Recettes, colonne O) contient l'**id de la version simplifiée**.
- Titres : même nom de plat, suivi de « (version simplifiée) » ou « (version authentique) ».
- La version simplifiée vient juste avant l'authentique dans l'onglet Recettes.
- L'alcool suit la règle du § 2 dans les deux versions.
- Les interdits du § 1 s'appliquent aussi aux versions authentiques : on retire l'ingrédient et on le signale dans l'astuce.

## 6. Format des données (Google Sheet)

### Onglet Recettes
`id | titre | description | portions_base | prepa_min | cuisson_min | budget_1a3 | frigo_jours | congelation | tags | accompagnement | ordre_fraicheur | couleur | astuce | variante_de | pays`

- `id` : kebab-case, unique.
- `tags` : séparés par « , » parmi : `volaille, porc, boeuf, poisson, vege, pates, legumineuses, rapide, asie, accompagnement, authentique`.
  - `rapide` = prépa + cuisson ≤ 30 min.
  - `accompagnement` = plat d'accompagnement (banchan, raita…) : il ne compte pas comme un repas dans le planificateur.
- `accompagnement` (colonne K) : ce qu'on sert avec (`riz`, `pates` ou vide).
- `ordre_fraicheur` : 1 volaille / poisson frais, 2 porc / bœuf, 3 fumé / salé, 4 végé et accompagnements.
- `couleur` : teinte HSL (0-360).
- `pays` (colonne P) : pays d'origine en français (« Inde », « Chine », « La Réunion »…), rempli aussi pour la version authentique. Sert au tri et au drapeau dans l'app.

### Onglet Ingrédients
`recette_id | ordre | ingredient_cle | quantite | note` (colonnes F et G calculées automatiquement depuis le Catalogue, ne pas les écrire).

- `ingredient_cle` doit **exister dans le Catalogue** (sinon l'ajouter d'abord).
- `quantite` est exprimée dans l'unité du Catalogue (`g, cl, pc, gousse, cm, botte, boite, cas, cac, selon`) ; laisser vide pour `sel`.

### Onglet Étapes
`recette_id | numero | texte | minuteur_min`

- Chaque ingrédient de la recette doit apparaître au moins une fois sous forme de jeton `{cle}` (affiché avec sa quantité). Pas de jeton pour un ingrédient absent de la liste.
- Ne pas écrire de tournure qui casse une fois le jeton remplacé (ex. « d'{eau} »). Préférer « verse {eau} ».
- `minuteur_min` : durée en minutes pour les étapes d'attente ou de cuisson, sinon vide.

### Onglet Catalogue
`cle | nom | nom_singulier | nom_court | rayon | unite | arrondi | conservation_jours | conditionnement_taille | conditionnement_libelle | non_achete | prix_lidl_eur | prix_pour (calculé) | source_prix`

- `rayon` : `viande, legumes, frais, surgeles, epicerie, epices, boissons, autre`.
- Prix : au kg pour `g` sans conditionnement, à la pièce pour `pc`, sinon par conditionnement. Épices et sauces de placard : non chiffrées (« Placard, non chiffré »).
- Locale fr_FR : dans les formules, séparateur **« ; »**.

## 7. Checklist avant d'ajouter une recette

- [ ] Aucun champignon, petit pois, pois chiche, fève.
- [ ] Alcool gardé s'il fait partie de la recette, avec l'alternative sans alcool en note (ingrédient + astuce).
- [ ] Pas de four ; air fryer ou plaque uniquement.
- [ ] Haricots secs + trempage si légumineuses ; rien de « tout en boîte ».
- [ ] 6 portions.
- [ ] Colonne `pays` remplie.
- [ ] Toutes les clés d'ingrédients existent dans le Catalogue.
- [ ] Chaque ingrédient est cité dans les étapes par `{cle}`.
- [ ] Versions authentiques : tag `authentique`, `variante_de` rempli, titres suffixés, rangée après la simplifiée.
- [ ] Ne pas modifier les recettes existantes sans demande explicite.
