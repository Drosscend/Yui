"use strict";
const { get } = require("https");

exports.run = async (client, message, args) => {

    if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Veuillez passer sur le channel NSFW afin d'utiliser cette commande.")

    get("https://neko-love.xyz/api/v1/nekolewd", (res) => {
        const { statusCode } = res;
        if (statusCode != 200) {
            res.resume;
        }
        res.setEncoding("utf8");
        let rawData = '';
        res.on("data", (chunk) => {
            rawData += chunk;
        });
        res.on("end", () => {
            try {
                const parsedData = JSON.parse(rawData);
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
                        description: `<:browser1:600349429597470740> Image **nekolewd** générée par **neko-love.xyz**: [Lien de l'image](${parsedData.url})`,
                        image: {
                            url: parsedData.url
                        },
                    }
                })
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on("error", (err) => {
        console.error(err.message);
    });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "nekolewd",
  category: "ImagesNSFW",
  description: "Affiche une image de type\"nekolewd\"",
  usage: "nekolewd"
};
