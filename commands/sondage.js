"use strict";

exports.run = async (client, message, args) => {

    args = args.slice(0).join(" ");
    if (!args) return message.channel.send("<:warn:600349289427894272> Aucun sondage crée, veuillez fournir un message.");

    message.channel.send({
        embed: {
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
            description: `Sondage demandé par **${message.author.username}**:\n${args}`
        }
    }).then((function (message) {
        message.react("❎");
        message.react("✅");
    }));

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Server Owner"
};

exports.help = {
  name: "sondage",
  category: "Divers",
  description: "Proposez un sondage.",
  usage: "sondage [question]"
};
