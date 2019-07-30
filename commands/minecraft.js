"use strict";
const request = require('request');
const snekfetch = require('snekfetch');

exports.run = async (client, message, args) => {

    var ip = args[0];
    if(!ip) return message.channel.send("<:warn:600349289427894272> Veuillez entrer une IP");
    var img = `https://eu.mc-api.net/v3/server/favicon/${ip}`;

    var url = '';
    if(ip.split(':').length > 1) url = `https://mcapi.us/server/status?ip=${ip.split(':')[0]}&port=${ip.split(':')[1]}`;
    else url = `https://mcapi.us/server/status?ip=${ip}`;

    request(url, { json: true }, async function (error, response, body) {
        if(error) return message.channel.send("<:warn:600349289427894272> Une erreur est survenue lors de la requête à l'api");
        if(body.error.length > 1){
            if(body.error === "invalid hostname or port" || !body.online) return message.channel.send("<:warn:600349289427894272> Ce serveur est hors ligne ou a bloquer les accès. Rappel : les serveurs MCPE ne sont pas pris en charge !");
            else return message.channel.send("<:warn:600349289427894272> Une erreur est survenue.");
        }

        request('https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t=mc.hypixel.net', function (err, r, b) {
            var url = `https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t=${ip}`;

            snekfetch.get(url).then(r => {
                message.channel.send({embed: {
                    color: 0xDF9C9D,
                    thumbnail: {
                        url: img
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
                    description: `Informations sur **${ip}**`,
                    fields: [
                        {
                            name: "Version:",
                            value: `${body.server.name}`,
                            inline: true
                        }, {
                            name: "Actuellement connectés:",
                            value: `${body.players.now} joueur(s)`,
                            inline: true
                        }, {
                            name: "Maximum:",
                            value: `${body.players.max} joueur(s)`,
                            inline: true
                        }
                    ]
                }}).catch((err) => {
                    if(err) {
                        return message.channel.send("<:warn:600349289427894272> Ce serveur est hors ligne ou a bloquer les accès. Rappel : les serveurs MCPE ne sont pas pris en charge !");
                    }
                });
            });

            
        });

        
    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mc"],
  permLevel: "User"
};

exports.help = {
  name: "minecraft",
  category: "Fun",
  description: "Affiche des informations sur le serveur Minecraft.",
  usage: "minecraft [ip]"
};
