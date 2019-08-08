"use strict";
const moment = require("moment");
moment.locale('fr');

exports.run = async (client, message, args) => {

    const search = args.slice(0).join(' ');
    let {
        member
    } = message;
    if (message.mentions.members.size > 0) {
        member = message.mentions.members.first();
    } else if (search) {
        member = client.findersUtil.findMember(message.guild, search);
        if (member.size === 0) {
            return message.channel.send(`<:warn:600349289427894272> Aucun membre n'a été trouvé avec: \`${search}\`!`);
        } else if (member.size === 1) {
            member = member.first();
        } else {
            return message.channel.send(client.findersUtil.formatMembers(client, member));
        }
    };

    var user = member.user;

    if (user.bot == true) {
        var checkbot = "du bot";
    } else {
        var checkbot = "de l'humain";
    }
    
    /* Status and game */
    let status;
    switch (member.user.presence.status) {
        case 'online':
            status = `<:online:600352893673013268> Online`;
            break;
        case 'idle':
            status = `<:idle:600352893111107585> Absent`;
            break;
        case 'dnd':
            status = `<:dnd:600352893450715146> Do not disturb`;
            break;
        default:
            status = `<:offline:600352893471555614> Offline`;
            break;
    }

    if (member.user.presence.game.name) status = `${status}\n🎮 Joue à **${member.user.presence.game.name}**`;

        message.channel.send({
            embed: {
                color: 0xDF9C9D,
                thumbnail: {
                    url: user.displayAvatarURL
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
                description: `Voici les différentes informations ${checkbot}: **${user.username}**`,
                fields: [{
                    name: "Pseudo sur le serveur:",
                    value: `${user}`,
                    inline: true
                }, {
                    name: "Pseudo global:",
                    value: `${user.username + "#" + user.discriminator}`,
                    inline: true
                }, {
                    name: "Status:",
                    value: status,
                    inline: true
                }, {
                    name: "ID:",
                    value: user.id,
                    inline: true
                }, {
                    name: "A rejoint discord le:",
                    value: moment(user.createdAt).format("Do MMMM YYYY"),
                    inline: true
                }, {
                    name: "A rejoint le serveur le:",
                    value: moment(message.guild.members.get(user.id).joinedAt).format("Do MMMM YYYY"),
                    inline: true
                }, {
                    name: "Roles:",
                    value: member.roles.filter(r => r.id !== message.guild.id).sort((a, b) => b.position - a.position).map(r => r.toString()).join(', ') || `Aucun`
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
  name: "uinfo",
  category: "Divers",
  description: "Donne les informations sur vous ou l'utilisateur identifier.",
  usage: "uinfo (member)"
};
