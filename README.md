# Torrent Web Downloader

![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

Un client torrent avec interface web moderne et design "hacking", facile à utiliser même pour les débutants.

## 🚀 Fonctionnalités

- Interface web moderne avec effet visuel de toile d'araignée animée
- Téléchargement par lien magnet ou fichier .torrent
- Sélection du répertoire de destination
- Suivi en temps réel des téléchargements
- Installation automatisée pour Windows

## 📋 Prérequis

- Système d'exploitation Windows (7/8/10/11)
- Connexion Internet
- Droits administrateur (pour l'installation de Node.js)

## 💻 Installation

### Option 1 : Installation automatique (recommandée)

1. Téléchargez et décompressez ce dossier sur votre PC
2. Double-cliquez sur `install_torrent_downloader.bat`
3. Attendez la fin de l'installation automatique

### Option 2 : Installation manuelle

1. Installez [Node.js LTS](https://nodejs.org/fr/download/) (si ce n'est pas déjà fait)
2. Ouvrez une invite de commande dans le dossier `server`
3. Exécutez `npm install express webtorrent cors multer`

## 🔧 Utilisation

### Démarrer le serveur

1. Double-cliquez sur `start_server.bat` pour lancer le serveur
   OU exécutez `node index.js` dans le dossier `server` via une invite de commande
2. Le serveur démarre sur [http://localhost:3000](http://localhost:3000)

### Accéder à l'interface web

- Ouvrez le fichier `web/index.html` dans votre navigateur

### Télécharger un torrent

1. Collez un lien magnet OU sélectionnez un fichier .torrent
2. (Optionnel) Choisissez un dossier de destination
3. Cliquez sur "Ajouter le torrent"
4. Suivez la progression dans la section "Vos torrents"

## 📱 Accéder à distance (optionnel)

Pour accéder à l'interface depuis un autre appareil du réseau :

1. Déployez le dossier `web` sur GitHub Pages
2. Modifiez l'URL de l'API dans `main.js` pour qu'elle pointe vers l'IP de votre PC

## 🆘 Dépannage

- **Problème** : Le script d'installation échoue
  **Solution** : Installez manuellement Node.js puis exécutez `npm install` dans le dossier `server`

- **Problème** : Impossible de démarrer le serveur
  **Solution** : Assurez-vous que le port 3000 n'est pas utilisé par une autre application

- **Problème** : Les téléchargements ne démarrent pas
  **Solution** : Vérifiez que le lien magnet est valide ou que le fichier .torrent est correct

## 🔒 Sécurité

Ce logiciel est conçu pour un usage personnel. N'exposez pas le serveur sur Internet sans protection adéquate.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
