"use strict";
const weather = require('weather-js');

exports.run = async (client, message, args) => {

    weather.find({ search: args.join(" "), degreeType: 'C', lang: 'fr-FR' }, function (err, result) {
        if (result === undefined || result.length === 0) {
            message.channel.send('<:warn:600349289427894272> Veuillez entrer une localisation correcte.')
            return;
        }
        var current = result[0].current;
        var location = result[0].location;
        let embedFields = [];

        embedFields.push({
            name: `Informations:`,
            value: `${current.skytext}`,
            inline: true
        });
        embedFields.push({
            name: `Nom:`,
            value: `${location.name}`,
            inline: true
        });
        embedFields.push({
            name: `Latitude et longitude:`,
            value: `${location.lat} - ${location.long}`,
            inline: true
        });
        embedFields.push({
            name: `Fuseau horaire:`,
            value: `${location.timezone}`,
            inline: true
        });
        embedFields.push({
            name: `Température:`,
            value: `${current.temperature}`,
            inline: true
        });
        embedFields.push({
            name: `Humidité:`,
            value: `${current.humidity}`,
            inline: true
        });
        embedFields.push({
            name: `Ville et heure d'observation:`,
            value: `${current.observationpoint} à ${current.observationtime}`,
            inline: true
        });
        
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
                thumbnail: {
                    url: current.imageUrl
                },
                fields: embedFields,
            }
        })

    });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "meteo",
  category: "Divers",
  description: "Affiche la météo de la ville demandée.",
  usage: "meteo"
};
