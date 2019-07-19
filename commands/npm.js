"use strict";
const axios = require("axios");

exports.run = async (client, message, args) => {

    if (!args[0]) {
        return message.channel.send("<:warn:600349289427894272> Vous devez spécifier au moins un mot-clé.");
    }

    const results = await axios({
        method: "get",
        url: `https://www.npmjs.com/search/suggestions?q=${encodeURIComponent(args.join(" "))}&size=${20}`,
        headers: { "Content-Type": "application/json" }
    }).then(r => r.data);
    if (!results[0]) {
        return message.channel.send("<:warn:600349289427894272> Votre recherche n'a donné aucun résultat.");
    }
    let embedFields = [];
    if (results[0].name) {
        embedFields.push({
            name: "Nom:",
            value: `[${results[0].name}](https://www.npmjs.com/package/${results[0].name})`,
            inline: true
        });
    }
    if (results[0].version) {
        embedFields.push({
            name: "Version:",
            value: results[0].version,
            inline: true
        });
    }
    if (results[0].publisher) {
        embedFields.push({
            name: "Auteur:",
            value: typeof results[0].publisher === "string" ? results[0].publisher : results[0].publisher.username,
            inline: true
        });
    }
    if (results[0].description) {
        embedFields.push({
            name: "Description:",
            value: results[0].description
        });
    }
    if (results[0].links) {
        embedFields.push({
            name: "Liens:",
            value: (() => {
                const links = [];
                for (const key in results[0].links) {
                    links.push(`[${key}](${results[0].links[key]})`);
                }
                return links.join(", ");
            })()
        });
    }

    return message.channel.send({
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
            thumbnail: {
                url: "https://cdn.freebiesupply.com/logos/large/2x/npm-2-logo-png-transparent.png"
            },
            fields: embedFields,
        }
    });

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "npm",
  category: "Utiles",
  description: "Affiche des informations à propos d'un packet npm.",
  usage: "npm"
};
