"use strict";

exports.run = async (client, message, args) => {

    //if (!message.guild.available) return client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) est indisponible.`);
    message.reply("Tu es sûr que tu veux que je quitte cette guilde ? **(Y/N)**");
    return message.channel.awaitMessages(m => m.author.id === message.author.id, {
        "errors": ["time"],
        "max": 1,
        time: 20000
    }).then(resp => {
        if (!resp) return message.channel.send("Fin du temps imparti.");
        resp = resp.array()[0];
        const validAnswers = ["Y", "N", "y", "n"];
        if (validAnswers.includes(resp.content)) {
            if (resp.content === "N" || resp.content === "n") {
                return message.channel.send("On dirait que je ne partirai pas.");
            } else if (resp.content === "Y" || resp.content === "y") {
                message.channel.send("Utilisez ceci si vous voulez m'ajouter à nouveau !\nhttps://discordapp.com/oauth2/authorize/?permissions=2117463295&scope=bot&client_id=584819038560190466");
                message.guild.leave()
                    .catch(err => {
                        return message.channel.send(`J'ai essayé de partir, mais je n'ai pas pu.`);
                    });
            }
        }
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["leaveguild"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "leaveserver",
  category: "Owner",
  description: "Quitte le serveur actuel.",
  usage: "leaveserver"
};
