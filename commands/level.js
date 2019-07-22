"use strict";

exports.run = async (client, message) => {

        const data = client.ranking.get(message.guild.id);
        if (!data.members[message.author.id]) {
            return message.channel.send("<:warn:600349289427894272> Vous n'estes pas dans la base de donnée.");
        }
        function progressBar(xp, xpMax) {
            const msg = [];
            let i = 0;
            for(i = 0; i < (100 * xp / xpMax) / 10 - 0.5; i++) {
                msg.push("▰");
            }
            for(let b = 0; b < 10 - i; b++) {
                msg.push("▱");
            }
            return msg.join("");
        }
        const userdb = data.members[message.author.id];
        message.channel.send({
            embed: {
                color: 0xDF9C9D,
            footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.username
            },
            timestamp: new Date(),
            thumbnail: {
                url: message.guild.iconURL
            },
            description: `${message.author.tag}\nLevel: ${userdb.level}\nXP: ${progressBar(userdb.exp, userdb.nextexp)}`
            }
        });
        
    };


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["lvl"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "level",
    category: "Fun",
    description: "Voir l'avancement de sont expérience pour atteindre le prochain niveau.",
    usage: "level"
  };
  