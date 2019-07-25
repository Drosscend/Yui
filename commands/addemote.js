"use strict";

exports.run = async (client, message, args) => {

    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return message.channel.send("<:forbidden:600349288823783449> Je n'es pas la permission **EMBED_LINKS** sur ce serveur.");
    if (!message.guild.member(client.user).hasPermission("MANAGE_EMOJIS")) return message.channel.send("<:forbidden:600349288823783449> Je n'es pas la permission **MANAGE_EMOJIS** sur ce serveur.");

    var url = args[0];
    if(!url) return message.channel.send("<:forbidden:600349288823783449> Veuillez indiquer l'url de l'émoji !");
    var name = args[1];
    if(!name) return message.channel.send("<:forbidden:600349288823783449> Veuillez indiquer le nom de l'émoji !");

    message.guild.createEmoji(url, name).then(emote => {
        message.channel.send(`Émoji **${emote.name}** ajouté au serveur !`);
    }).catch(err => {
        console.log(err)
        return message.channel.send(`<:forbidden:600349288823783449> L'URL vers l'image est invalide ou vous n'avez plus de place sur votre Discord ou l'image est supérieur à 256 kb!\n \`\`\`js\n${err}\`\`\``);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrateur"
};

exports.help = {
  name: "addemote",
  category: "Config",
  description: "Ajout un émoji au serveur.",
  usage: "addemote [https://openmoji.org]"
};
