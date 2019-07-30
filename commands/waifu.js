"use strict";
const { get } = require("https");

exports.run = async (client, message, args) => {

    get("https://neko-love.xyz/api/v1/waifu", (res) => {
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
                        description: `<:browser1:600349429597470740> Image **waifu** générée par **neko-love.xyz**: [Lien de l'image](${parsedData.url})`,
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
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "waifu",
  category: "Images",
  description: "Affiche une image de type\"waifu\"",
  usage: "waifu"
};
