"use strict";

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.channel.send({
    embed: {
        description: `Votre niveau de permission pour m'utiliser ici est **${level}** (${friendly})`,
        color: 0xDF9C9D,
        thumbnail: {
            url: message.author.displayAvatarURL
        },
        footer: {
            icon_url: client.user.displayAvatarURL,
            text: client.user.username
        },
        timestamp: new Date(),
        fields: [
          {
              name: "-Le niveau **0 (User)**",
              value: "C'est le niveau de permisison le plus bas, c'est pour les utilisateurs \"normaux\"."
          }, {
              name: "-Le niveau **2 (Modérateur)**",
              value: "C'est le niveau qui vous est attribué lorsque vous avez un rôle ce nommant Moderateur (il sera utilisé pour les commandes de modération, pensez à le mettre en dessus de User), vous pouvez le configurer avec la commande *setting*."
          }, {
              name: "-Le niveau **4 (Server Owner)**",
              value: "C'est le niveau du propriétaire du serveur tout simplement, il a le droit d'utiliser la commandes **conf** et toutes les précédentes."
          }, {
              name: "-Le niveau **8 (Bot Support)**",
              value: "C'est le niveau que les personnes qualifiées en gestion de serveur, c'est-à-dire que si vous avez un problème une personne ayant ce rôle pourra gérer les paramètres de votre serveur grâce à la commande **conf**."
          }, {
              name: "-Le nieveau **10 (Bot Owner)**",
              value: "C'est le niveau attribué uniquement au créateur du Bot, il peut absolument tout faire."
          }
      ]
    }
  });
}

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
