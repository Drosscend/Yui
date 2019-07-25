"use strict";

exports.run = async (client, message, args) => {

    var member = message.guild.members.random(1)[0];
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
    message.channel.send({
        embed: {
            color: 0xDF9C9D,
            thumbnail: {
                url: member.user.displayAvatarURL
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
                    name: "Pseudo",
                    value: member.user.username,
                    inline: true
                },
                {
                    name: "TAG",
                    value: member.user.discriminator,
                    inline: true
                },
                {
                    name: "ID",
                    value: member.user.id,
                    inline: true
                },
                {
                    name: "Status",
                    value: status,
                    inline: true
                }
            ]
            }
    })

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rplayer"],
  permLevel: "User"
};

exports.help = {
  name: "someone",
  category: "Utiles",
  description: "Tire un membre aléatoire sur le serveur.",
  usage: "someone"
};
