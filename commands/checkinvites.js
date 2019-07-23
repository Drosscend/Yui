"use strict";

exports.run = async (client, message, args) => {

    const members = message.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));

    return message.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "Personne ne semble posséder d'invitations discord dans son jeu !");


}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "checkinvite",
  category: "Modération",
  description: "Vérifie le jeu de chaque membre pour voir s'il n'y a pas une publicité dedans !",
  usage: "checkinvite"
};
