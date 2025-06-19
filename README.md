# Contrôle TVA - Dynamics 365

Cette application permet d'afficher dynamiquement une interface de comparaison TVA dans Microsoft Dynamics 365 en utilisant un script HTML/JavaScript personnalisé et une Azure Function.

## 📌 Fonctionnalité

- Récupère automatiquement les données du CRM (numéro de dossier, URL Loop).
- Génère un lien vers une Azure Function d'analyse TVA.
- Affiche le résultat dans un `iframe` intégré à l'écran Dynamics.
- Affiche des messages d'alerte et une barre de chargement dynamique.

## 🔧 Déploiement

1. Créez deux Web Resources dans Dynamics :
   - `fir_JSControletva` → fichier `index.js`
   - `fir_HTMLControletva` → fichier `index.html`

2. Associez le fichier HTML à une section de formulaire Dynamics (via Iframe WebResource).

3. Assurez-vous que les champs CRM suivants sont bien présents dans l'entité :
   - `fir_numerodedossierquadratus`
   - `fir_urlloopgrandlivregeneral`
   - (Optionnel) `crb72_urlloopgrandlivregeneral` pour URL personnalisée

## 🌐 API utilisée

L'application appelle une Azure Function hébergée ici :

```
https://comparateur-tva.azurewebsites.net/api/comparer

```


Elle utilise un `code` d'accès sécurisé passé en paramètre dans l'URL.

## 🛠️ Débogage

Vous pouvez activer/désactiver les logs de la console en modifiant cette variable dans `index.js` :

```js
var ShowDebugConsoleLog = true;
```

## 📁 Fichiers

- index.html — Page HTML qui appelle automatiquement read_html() et affiche l'iframe.

- index.js — Logique principale de récupération et d'affichage dans Dynamics.
