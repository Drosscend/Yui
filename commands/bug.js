"use strict";
const talkedRecently = new Set();

exports.run = async (client, message, args) => {

    if (talkedRecently.has(message.author.id)) {
        return message.channel.send(`${message.author} Attendez 10 secondes avant de taper à nouveau ce qui suit`);
    }

    let bugmessage = args.join(" ");
    if (!bugmessage) {
        return message.channel.send("<:warn:600349289427894272> Veuillez indiquer votre bug et mettre l'url du screen du bug.");
    }
    if (bugmessage.length > 1000) {
        return message.channel.send("<:warn:600349289427894272> Le maximum de caractères est de 1000.");
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
                name: "Dans le serveur:",
                value: message.guild.name,
                inline: true,
                }, {
                name: "Bug:",
                value: `\`\`\`${bugmessage}\`\`\``,
                }
            ]
        }
    }).then(message.channel.send("Message envoyé avec succès, merci."));
    
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
  name: "bug",
  category: "Bot",
  description: "Envoie votre message de bug sur le serveur support de Yui.",
  usage: "bug [message]"
};
