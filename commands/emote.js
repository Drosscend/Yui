"use strict";

exports.run = async (client, message) => {

  if (message.guild.emojis.size == 0) return message.channel.send("<:warn:600349289427894272> Il n'y a pas d'emotes sur ce serveur.");

  message.channel.send(`Voici les **${message.guild.emojis.filter(e => e.toString()).size}** emote du serveur **${message.guild.name}**:\n${message.guild.emojis.map(e => e).join(' - ')}`)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "emote",
  category: "Divers",
  description: "Affiche les emote du serveur.",
  usage: "emote"
};
