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
            description: `
            -[Ota](https://github.com/Steven-Debande)\n
            -[PsyKo ☾](https://github.com/SFallTech)\n
            -Emojis fait par [Vectors Market](https://www.flaticon.com/authors/vectors-market) pour [Flaticon](https://www.flaticon.com/) est titulaire d'une licence délivrée par [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/).`,
        }
    })
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "credits",
  category: "Bot",
  description: "Affiche les personnes qui m'ont aidé à créé Yui.",
  usage: "credits"
};
