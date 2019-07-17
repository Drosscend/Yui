"use strict";

exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.reply(`Votre niveau de permission pour m'utiliser ici est **${level}** (${friendly}).`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Bot",
  description: "Vous indique votre niveau d'autorisation pour l'emplacement actuel du message.",
  usage: "mylevel"
};
