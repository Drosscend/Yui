"use strict";
exports.run = async (client, message, args) => {

    if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Veuillez passer sur le channel NSFW afin d'utiliser cette commande.")

    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

     client.pictURL.getImage(sub)
        .then((image) => {
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
                        description: `Image **4k**: [Lien de l'image](${image.url})`,
                        image: {
                            url: image.url
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
  name: "4k",
  category: "ImagesNSFW",
  description: "Affiche une image de type\"4k\"",
  usage: "4k"
};
