"use strict";
const moment = require("moment");
moment.locale('fr');

exports.run = async (client, message, args) => {

    if(!args[0]) return message.channel.send('<:warn:600349289427894272> Veuillez spécifier un nom de role sans le **@**.');

    var role = message.content.split(" ").slice(1).join(" ");
    let foundRole = message.guild.roles.find(x => x.name === role);
    if(!foundRole){
      return message.channel.send("<:warn:600349289427894272> Veuillez spécifier un nom de role sans le **@**.");
    }

    if(!args[0]) return message.channel.send('<:warn:600349289427894272> Veuillez spécifier un nom de role sans le **@**.');

    message.channel.send({
        embed: {
            description: `Voici les différentes informations du rôle **${foundRole.name}**`,
            color: 0xDF9C9D,
            thumbnail: {
                url: message.guild.iconURL
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
            fields: [
                {
                    name: "Nom du role:",
                    value: `${foundRole.name}`,
                    inline: true
                }, {
                    name: "ID du role:",
                    value: `${foundRole.id}`,
                    inline: true
                }, {
                    name: "Couleur hexadécimale:",
                    value: `${foundRole.hexColor}`,
                    inline: true
                }, {
                    name: "Mentionable:",
                    value: foundRole.mentionable,
                    inline: true
                }, {
                    name: "Nombre de membre:",
                    value: foundRole.members.size,
                    inline: true
                }, {
                    name: "Role crée le:",
                    value: moment(foundRole.createdAt).format("Do MMMM YYYY"),
                    inline: true
                }
            ]
        }
    })
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "rinfo",
  category: "Divers",
  description: "Donne les informations sur le role.",
  usage: "rinfo [nom du rôle]"
};
