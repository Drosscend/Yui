"use strict";

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.reply(`Votre niveau de permission pour m'utiliser ici est **${level}** (${friendly}).\n
  -Le niveau **0 (User)** C'est le niveau de permisison le plus bas, c'est pour les utilisateurs "normaux".\n
  -Le niveau **2 (Modérateur)** C'est le niveau qui vous est attribué lorsque vous avez un rôle ce nommant Moderateur (il sera utilisé pour les commandes de modération, pensez à le mettre en dessus de User), vous pouvez le configurer avec la commande *setting*.\n
  -Le niveau **4 (Server Owner)** C'est le niveau du propriétaire du serveur tout simplement, il a le droit d'utiliser la commandes **conf**e t toutes les précédentes.\n
  -Le niveau **8 (Bot Support)** C'est le niveau que les personnes qualifiées en gestion de serveur, c'est-à-dire que si vous avez un problème une personne ayant ce rôle pourra gérer les paramètres de votre serveur grâce à la commande **conf**.\n
  -Le niveau **9 (Bot Admin)** C'est le niveau que seul les personnes de confiance ont ils ont pratiquement toutes les permissions sur le bot.\n
  -Le nieveau **10 (Bot Owner)** C'est le niveau attribué uniquement au créateur du Bot, il peut absolument tout faire.\n
  Pour toutes informations vous pouvez demander de l'aide sur le support de Yui: https://discord.gg/V53b8M7.`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Bot",
  description: "Vous indique votre niveau d'autorisation pour l'emplacement actuel du message.",
  usage: "mylevel"
};
