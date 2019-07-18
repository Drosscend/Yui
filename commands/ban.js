"use strict";

exports.run = async (client, message) => {
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "ban",
  category: "Modéraion",
  description: "Ban la personne identifier avec possibilité de mettre une raison.",
  usage: "ban [member] (raison)"
};
