# Discord

Discord comme une appli de NeoDex : la vraie application web de Discord, dans son propre onglet, aux couleurs de ton thème, avec le nombre de messages non lus affiché sur l'onglet.

*English version: [README.en.md](README.en.md)*

## Comment ça marche

- L'appli ouvre **discord.com/app**, la version web officielle : serveurs, salons, messages privés, appels vocaux et vidéo, partage d'écran, tout fonctionne comme dans le navigateur.
- **Connexion** : tu te connectes une fois avec ton compte Discord, comme sur n'importe quel site. La session est gardée dans le navigateur de NeoDex ; NeoDex ne lit jamais rien de ton compte.
- **Messages non lus** : l'onglet affiche « Discord (3) » quand tu as des mentions ou messages privés non lus, et « Discord • » quand il y a seulement du nouveau dans tes salons.
- **Couleurs** : les fonds, les accents et la barre de défilement de Discord prennent les couleurs du thème de NeoDex, et suivent quand tu changes de thème. Pour retrouver les couleurs d'origine, décoche **Discord aux couleurs de NeoDex** dans Paramètres → Apparence, puis recharge Discord.
- **Notifications** : la première fois, la barre de NeoDex te demande si Discord peut t'envoyer des notifications ; ta réponse est gardée dans les autorisations des sites.

## Données et synchronisation

Rien n'est synchronisé : la connexion reste sur chaque PC, et tes messages restent chez Discord. Le plugin demande l'accès complet parce qu'il affiche un site externe dans une vue intégrée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Discord → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
