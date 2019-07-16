# Yui
[![NodeJS](https://img.shields.io/badge/node.js-10.16.0-greenBright.svg)](https://nodejs.org/)
[![DiscordJS](https://img.shields.io/badge/discord.js-11.4.2-greenBright.svg)](https://discord.js.org/#/)
[![Yui](https://img.shields.io/badge/Yui-0.0.2--dev-greenBright.svg)](https://github.com/Drosscend/Yui)

## Prérequis

- `git` Installation en ligne de commande ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)).
- `node` [Version 8.0.0 ou supérieur](https://nodejs.org)
- Les outils de construction node-gyp. C'est un pré-requis pour Enmap, mais aussi pour d'autres modules. RLisez [The Enmap Guide](https://enmap.evie.codes/install#pre-requisites) pour plus de détail pour votre os. Il suffit de suivre ce qu'il y a dans le bloc à onglets seulement, puis de revenir ici !

Vous avez aussi besoin du token de votre bot. Ceci est obtenu en créant une application dans
la section Développeurs de discordapp.com.

## Téléchargement

Dans une invite de commande de votre dossier de projets (où que ce soit), exécutez ce qui suit :

`git clone https://github.com/Drosscend/Yui.git`

Une fois finie: 

- Dans le dossier où vous avez effecctuer la commande `git`, exécuter `cd Yui` puis `npm install`
- **Si vous obtenez une erreur à propos de python, msibuild.exe ou autres, relisez la section des exigences !**
- Exécuter `node setup.js` pour générer un fichier de configuration et des paramètres appropriés si il n'a pas été exécuter automatiquement.

## Démarrer le bot

Pour démarrer le bot, dans l'invite de commande, exécutez la commande suivante :
`node index.js`

## Inviter à une guilde

Pour ajouter le bot à votre guilde, vous devez obtenir un lien oauth pour cela:

Vous pouvez utiliser ce site pour vous aider à générer un lien OAuth complet, qui comprend une calculatrice pour les permissions :
[https://finitereality.github.io/permissions-calculator/?v=0](https://finitereality.github.io/permissions-calculator/?v=0)
