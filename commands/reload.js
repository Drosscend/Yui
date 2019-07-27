"use strict";

exports.run = async (client, message, args) => {
  if (!args || args.length < 1) return message.reply("<:warn:600349289427894272> Veuillez spécifier une commande.");

  let response = await client.unloadCommand(args[0]);
  if (response) return message.reply(`<:alarm:600349286328172545> Erreur de déchargement : ${response}`);

  response = client.loadCommand(args[0]);
  if (response) return message.reply(`<:alarm:600349286328172545> Erreur de chargement :  ${response}`);

  message.reply(`La commande \`${args[0]}\` à bien été recharger.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reload",
  category: "Owner",
  description: "Recharge une commande qui a été modifiée.",
  usage: "reload [commande]"
};
