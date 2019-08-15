"use strict";

exports.run = async (client, message) => {

    message.channel.send({
        embed: {
            color: 0xDF9C9D,
            thumbnail: {
                url: client.user.displayAvatarURL
            },
            author: {
                name: message.author.username,
                icon_url: message.author.displayAvatarURL
            },
            footer: {
                icon_url: client.user.displayAvatarURL,
                text: client.user.username
            },
            timestamp: new Date(),
            description: "Rejoignez mon support si vous avez besoin d'aide.",
            fields: [
                {
                    name: "**Lien:**",
                    value: `[Clique ici](https://discord.gg/V53b8M7)`,
                }
            ]
        }
    })

};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "support",
  category: "Bot",
  description: "Affiche le lien du support de Yui.",
  usage: "support"
};
