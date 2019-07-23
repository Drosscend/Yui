"use strict";

exports.run = async (client, message, args) => {

  message.channel.send(args);
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Support"
};

exports.help = {
  name: "say",
  category: "Bot",
  description: "Fait parler le bot à votre place :)",
  usage: "say [texte}]"
};
