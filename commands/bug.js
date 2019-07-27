"use strict";

exports.run = async (client, message, args) => {

    let bugmessage = args.join(" ");
    if (!bugmessage) {
        return message.channel.send("<:warn:600349289427894272> Veuillez indiquer votre bug et mettre l'url du screen du bug.");
    }
    client.channels.get("604667200636190750").send({
        embed: {
            color: 0xDF9C9D,
            thumbnail: {
                url: client.user.displayAvatarURL
            },
            footer: {
                icon_url: client.user.displayAvatarURL,
                text: client.user.username
            },
            timestamp: new Date(),
            fields: [
                {
                name: "Autheur:",
                value: message.author.username,
                inline: true,
                }, {
                name: "ID de l'autheur:",
                value: message.author.id,
                inline: true,
                }, {
                name: "Dans le serveur:",
                value: message.guild.name,
                inline: true,
                }, {
                name: "ID du serveur:",
                value: message.guild.id,
                inline: true,
                }, {
                name: "Bug:",
                value: `\`\`\`${bugmessage}\`\`\``,
                }
            ]
        }
    }).then(message.channel.send("Message envoyée avec succès, merci."))
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bug",
  category: "Bot",
  description: "Envoie votre message de bug sur le serveur support de Yui.",
  usage: "bug [message]"
};
