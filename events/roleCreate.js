'use strict';
const moment = require("moment");
moment.locale('fr');

module.exports = (client, role) => {
    
    const settings = client.getSettings(role.guild);
    
    var logs = role.guild.channels.find(c => c.name === settings.LogChannel);
    if (!logs) return;
    
    logs.send({
        embed: {
            color: 0xDF9C9D,
            footer: {
                icon_url: client.user.displayAvatarURL,
                text: client.user.username
            },
            thumbnail: {
                url: role.guild.iconURL
            },
            timestamp: new Date(),
            description: `Un rôle vient d'être crée: **${role}**.`,
            fields: [{
                name: "mentionable:",
                value: role.mentionable,
                inline: true
            }, {
                name: "Position:",
                value: role.calculatedPosition,
                inline: true
            }, {
                name: "Permission:",
                value: role.permissions,
                inline: true
            }, {
                name: "ID:",
                value: role.id,
                inline: true
            }, {
                name: "Couleur:",
                value: role.hexColor,
                inline: true
            }, {
                name: "Crée le:",
                value: moment(role.createdAt).format("Do MMMM YYYY"),
                inline: true
            }]
        }
    })
};
