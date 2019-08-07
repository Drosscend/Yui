"use strict";

exports.run = async (client, message, args) => {

    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send('<:forbidden:600349288823783449> Je n\'es pas la permission **Manage Messages** sur ce serveur.');
    if(!args[0]) return message.channel.send('<:warn:600349289427894272> Veuillez spécifier un nombre de messages à supprimer.');
    if (isNaN(args[0])) return message.channel.send('<:warn:600349289427894272> Veuillez fournir un nombre.');
    if (args[0] < 1) return message.channel.send('<:warn:600349289427894272> Veuillez fournir un nombre supérieur ou égal à 1.');
    if (args[0] > 100) return message.channel.send('<:warn:600349289427894272> Veuillez fournir un nombre inférieur à 100.');


    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`🗑 J'ai supprimer **${args[0]}** messages.`).then(message => message.delete(3000));
    }).catch((e) => message.channel.send('<:warn:600349289427894272> Vous ne pouvez pas supprimer les messages de plus de 14 jours.'));
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["clear"],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "Modération",
  description: "Supprime un certain nombre de messages dans le salon où la commande à été effectuer.",
  usage: "purge [nomber]"
};
