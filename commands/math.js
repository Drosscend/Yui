"use strict";
const math = require("mathjs");

exports.run = async (client, message, args) => {

    const exp = args.slice(0).join("");
    if (!exp) return message.channel.send("<:warn:600349289427894272> Vous devez entrer un calcul.");
    if (exp.length > 1010) return message.channel.send("<:warn:600349289427894272> Le calcul est trop long.");

    let result;
    try {
        result = math.evaluate(exp);
    } finally {
        if (isNaN(parseFloat(result))) {
            message.reply("<:warn:600349289427894272> Expression de calcul incorrecte");
        } else {
            message.channel.send({
                embed: {
                    color: 0xDF9C9D,
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
                            name: ":inbox_tray: Input",
                            value: `\`\`\`js\n${exp}\n\`\`\``,
                        }, {
                            name: ":outbox_tray: Output",
                            value: `\`\`\`js\n${result}\n\`\`\``,
                        }
                    ]
                }
            })
        }
    }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "math",
  category: "Divers",
  description: "Fait des calculs.",
  usage: "math [calcul]"
};
