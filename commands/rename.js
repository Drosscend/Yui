"use strict";

exports.run = async (client, message, args) => {

    let name = args[0]
    if (!name) return message.channel.send(`<:warn:600349289427894272> Aucun nom spésifier!`);

    client.user.setUsername(name).then(name => {
        message.channel.send(`Mon nom à bien été changé par **${name}**.`)
    }).catch((e) => {
        message.channel.send(`<:warn:600349289427894272> Une erreur est survenue avec le nom **${name}**: \`\`\`${e}\`\`\``)
    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "rename",
  category: "Owner",
  description: "Change le nom du bot.",
  usage: "rename [nom]"
};