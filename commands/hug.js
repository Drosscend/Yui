"use strict";
const { get } = require("https");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {

    if (talkedRecently.has(message.author.id)) {
        return message.channel.send(`${message.author} Attendez 10 secondes avant de taper à nouveau ce qui suit`);
    }
    get("https://neko-love.xyz/api/v1/hug", (res) => {
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
                        description: `Image **hug** générée par **neko-love.xyz**: [Lien de l'image](${parsedData.url})`,
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
    talkedRecently.add(message.author.id);
        setTimeout(() => {
          
          talkedRecently.delete(message.author.id);
        }, 10000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "hug",
  category: "Images",
  description: "Affiche une image de type\"hug\"",
  usage: "hug"
};
