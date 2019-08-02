"use strict";

exports.run = async (client, message) => {

    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send("<:forbidden:600349288823783449> Je n'es pas la permission **BAN_MEMBERS** sur ce serveur.");

    message.guild.fetchBans()
        .then(bans => {
            const obj = bans.map(b => ({
                user: `${b.username}#${b.discriminator}`
            }));
            const bList = Array.from(obj);
            if (bList.length < 1) return message.author.send(`Il n'y a pas d'utilisateurs bannis dans **${message.guild.name}**.`);
            let index = 0;

            message.author.send({
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
                  description: `${bList.map(bl => `**${++index} -** ${bl.user}`).join("\n")}`,
                  title:`Liste des personnes ban pour ${message.guild.name}`
              }
          })
            message.channel.send("La liste des personnes ban vous a été envoyé en DM.");
        })

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "banlist",
  category: "Modération",
  description: "Vous fournit une liste des utilisateurs bannis en DM.",
  usage: "banlist"
};
