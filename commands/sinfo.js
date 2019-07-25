"use strict";
const moment = require("moment");

exports.run = async (client, message, args) => {

    let explicit;
        switch (message.guild.explicitContentFilter) {
            case 0:
                explicit = `Ne pas analyser de messages.`;
                break;
            case 1:
                explicit = `Analyse les messages des membres sans rôle.`;
                break;
            case 2:
                explicit = `Analyse les messages envoyés par tous les membres.`;
                break;
            default:
                explicit = `Inconue`;
                break;
        };

        let verificationLevel;
        switch (message.guild.verificationLevel) {
            case 0:
                verificationLevel = `Aucun (Aucune restriction)`;
                break;
            case 1:
                verificationLevel = `Faible (Doir avoir un email vérifié sur son compte Discord.)`;
                break;
            case 2:
                verificationLevel = `Moyen (Doit aussi être inscrit sur Discord depuis plus de 5 minutes.)`;
                break;
            case 3:
                verificationLevel = '(╯°□°）╯︵ ┻━┻ (Doit aussi être un membre de ce serveur depuis plus de 10 minutes.)';
                break;
            case 4:
                verificationLevel = '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻ (Doit avoir un téléphone vérifié sur son compte Discord.)';
                break;
            default:
                verificationLevel = `Inconue`;
                break;
        };

        message.channel.send({
            embed: {
                description: `Voici les différentes informations de **${message.guild.name}**`,
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
                fields: [
                    {
                        name: "Nom du serveur:",
                        value: `${message.guild.name}`,
                        inline: true
                    }, {
                        name: "ID du serveur:",
                        value: `${message.guild.id}`,
                        inline: true
                    }, {
                        name: "Région du serveur:",
                        value: message.guild.region,
                        inline: true
                    }, {
                        name: "Serveur créé le:",
                        value: moment(message.guild.createdAt).format("Do MMMM YYYY"),
                        inline: true
                    }, {
                        name: "Propriétaire du serveur:",
                        value: message.guild.owner.user.tag,
                        inline: true
                    }, {
                        name: "Nombre de membre:",
                        value: message.guild.memberCount,
                        inline: true
                    }, {
                        name: "Channel du serveur:",
                        value: `**${message.guild.channels.filter(channel => channel.type === 'text').size}** textuel - **${message.guild.channels.filter(channel => channel.type === 'voice').size}** audio`,
                        inline: true
                    }, {
                        name: "Channel AFK:",
                        value: `${message.guild.afkChannel}`,
                        inline: true
                    }, {
                        name: "Dernier membre ayant rejoint:",
                        value: `${Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).splice(0, 1)}`,
                        inline: true
                    }, {
                        name: "Filtre de contenu explicite:",
                        value: explicit,
                        inline: true
                    }, {
                        name: "Niveau de vérification:",
                        value: verificationLevel,
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
  name: "sinfo",
  category: "Divers",
  description: "Donne les informations sur le serveur.",
  usage: "sinfo"
};
