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
            const embed = new RichEmbed().setTitle(`Liste des personnes ban pour ${message.guild.name}`).setDescription(`${bList.map(bl => `**${++index} -** ${bl.user}`).join("\n")}`);
            message.author.send({embed});
            message.react("👌");
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
