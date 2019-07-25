"use strict";

const randomPuppy = require('random-puppy');

exports.run = async (client, message, args) => {

    if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Veuillez passer sur le channel NSFW afin d'utiliser cette commande.")

    var subreddits = [
        'pussy',
        'rearpussy',
        'simps',
        'vagina',
        'MoundofVenus',
        'PerfectPussies',
        'spreading'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

     randomPuppy(sub)
        .then(url => {
                message.channel.send({
                    embed: {
                        color: 0xDF9C9D,
                        author: {
                            name: message.author.username,
                            icon_url: message.author.displayAvatarURL
                        },
                        footer: {
                            icon_url: client.user.displayAvatarURL,
                            text: client.user.username
                        },
                        timestamp: new Date(),
                        description: `Image **pussy** générée par **neko-love.xyz**: [Lien de l'image](${url})`,
                        image: {
                            url: url
                        },
                    }
            })
        }) 

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "pussy",
  category: "ImagesNSFW",
  description: "Affiche une image de type\"pussy\"",
  usage: "pussy"
};
