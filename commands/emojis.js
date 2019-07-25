"use strict";

exports.run = async (client, message) => {

    if (message.guild.emojis.size == 0) return message.channel.send("<:warn:600349289427894272> Il n'y a pas d'emojis sur ce serveur.");

    message.channel.send(`Voici les **${message.guild.emojis.filter(e => e.toString()).size}** emojis du serveur **${message.guild.name}**:\n${message.guild.emojis.map(e => e).join(' - ')}`)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "emojis",
  category: "Divers",
  description: "Affiche les emojis du serveur.",
  usage: "emojis"
};
