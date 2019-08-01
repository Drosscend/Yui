"use strict";
const fortnite = require('fortnite');

exports.run = async (client, message, args) => {

    const fortniteClient = new fortnite(client.config.fortnite);

    var platform = args[0];
    if(!platform || (platform !== 'pc' && platform !== 'xbl' && platform !== 'psn')) return message.channel.send("<:forbidden:600349288823783449> Entrez une plateforme valide : \`psn\`, \`pc\` ou \`xbl\`.");

    var user = args[1];
    if(!user) return message.channel.send("<:forbidden:600349288823783449> Entrez un pseudo epic games valide.");

    fortniteClient.user(user, platform).then(tdata => {
        if(tdata.code === 404) return message.channel.send(`Joueur ${user} introuvable sur la plateforme ${platform}`);

        message.channel.send({embed: {
            color: 0xDF9C9D,
            author: {
                name: message.author.username,
                icon_url: message.author.displayAvatarURL
            },
            footer: {
                icon_url: client.user.displayAvatarURL,
                text: client.user.username
            },
            thumbnail: {
                url: "https://cdn.imgbin.com/5/5/2/imgbin-fortnite-battle-royale-logo-battle-royale-game-font-fortnit-WmR8HcKAPsuTMTvnWdhFFfuwJ.jpg",
              },
            timestamp: new Date(),
            title: tdata.username,
            url: tdata.url,
            description: `${user} joue sur ${platform}\nID: ${tdata.id}`,
            fields: [
                {
                    name: "Solo:",
                    value: `K/D: ${tdata.stats.solo.kd}\nParties : ${tdata.stats.solo.matches}\nKills : ${tdata.stats.solo.kills}\nVictoire(s) : ${tdata.stats.solo.wins}`,
                },
                {
                    name: "Duo:",
                    value: `K/D: ${tdata.stats.duo.kd}\nParties : ${tdata.stats.duo.matches}\nKills : ${tdata.stats.duo.kills}\nVictoire(s) : ${tdata.stats.duo.wins}`,
                },
                {
                    name: "Squad:",
                    value: `K/D: ${tdata.stats.squad.kd}\nParties : ${tdata.stats.squad.matches}\nKills : ${tdata.stats.squad.kills}\nVictoire(s) : ${tdata.stats.squad.wins}`,
                },
                {
                    name: "Lifetime:",
                    value: `K/D: ${tdata.stats.lifetime.kd}\nParties : ${tdata.stats.lifetime.matches}\nKills : ${tdata.stats.lifetime.kills}\nVictoire(s) : ${tdata.stats.lifetime.wins}`,
                }
            ]
        }})
    })

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "fortnite",
  category: "Fun",
  description: "Affiche les stats Fortnite d'un joueur.",
  usage: "fortnite [ps4/pc/xb1] [username]"
};
