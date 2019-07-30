"use strict";
const talkedRecently = new Set();

exports.run = async (client, message, args) => {

    if (talkedRecently.has(message.author.id)) {
        return message.channel.send(`${message.author} Attendez 10 secondes avant de taper à nouveau ce qui suit`);
    }

    let suggestionmessage = args.join(" ");
    if (!suggestionmessage) {
        return message.channel.send("<:warn:600349289427894272> Veuillez indiquer votre suggestion.");
    }
    client.channels.get("601709073469145117").send({
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
                name: "Suggestion:",
                value: `\`\`\`${suggestionmessage}\`\`\``,
                }
            ]
        }
    }).then(message.channel.send("Message envoyée avec succès, merci."))

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      
      talkedRecently.delete(message.author.id);
    }, 10000);

    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "suggestion",
  category: "Bot",
  description: "Envoie votre suggestion sur le serveur support de Yui.",
  usage: "suggestion [message]"
};
