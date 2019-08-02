"use strict";

const { inspect } = require("util");

exports.run = async (client, message, [action, key, ...value]) => {

  const defaults = client.settings.get("default");

  if (action === "add") {
    if (!key) return message.reply("<:warn:600349289427894272> Veuillez spécifier une clé à ajoutée.");
    if (!defaults[key]) return message.reply("<:warn:600349289427894272> Cette clé existe déja dans les réglages.");
    if (value.length < 1) return message.reply("<:warn:600349289427894272> Veuillez spécifier une valeur.");

    defaults[key] = value.join(" ");
  
    client.settings.set("default", defaults);
    message.reply(`\`${key}\` à bien été ajouté avec la valuer \`${value.join(" ")}\`.`);
  } else
  
  if (action === "edit") {
    if (!key) return message.reply("<:warn:600349289427894272> Veuillez spécifier une clé à édité.");
    if (!defaults[key]) return message.reply("<:warn:600349289427894272> Cette clé n'existe pas dans les réglages.");
    if (value.length < 1) return message.reply("<:warn:600349289427894272> Veuillez spécifier une nouvelle valeur.");

    defaults[key] = value.join(" ");

    client.settings.set("default", defaults);
    message.reply(`\`${key}\` à bien été éditée à \`${value.join(" ")}\`.`);
  } else
  
  if (action === "del") {
    if (!key) return message.reply("<:warn:600349289427894272> Veuillez spécifiez une clée à supprimée.");
    if (!defaults[key]) return message.reply("<:warn:600349289427894272> Cette clé n'existe pas dans les réglages.");
    
    const response = await client.awaitReply(message, `<:warn:600349289427894272> Êtes-vous sûr de vouloir supprimé \`${key}\`?. Répondres par **oui** ou **non**`);

    if (["y", "yes", 'oui'].includes(response)) {

      delete defaults[key];
      client.settings.set("default", defaults);
      
      for (const [guildid, conf] of client.settings.filter((setting, id) => setting[key] && id !== "default")) {
        delete conf[key];
        client.settings.set(guildid, conf);
      }
      
      message.reply(`\`${key}\` à bien été supprimé.`);
    } else
    if (["n","no","cancel", "non"].includes(response)) {
      message.reply("Action annulée.");
    }
  } else{
    await message.channel.send({
      embed: {
        color: 0xDF9C9D,
        thumbnail: {
          url: client.user.displayAvatarURL,
        },
        description: `<:settings:600349289394470923> Voici les paramètre par défaut.`,
        author: {
          name: message.author.username,
          icon_url: message.author.displayAvatarURL,
        },
        footer: {
          icon_url: client.user.displayAvatarURL,
          text: client.user.username,
        },
        timestamp: new Date(),
        fields: [
          {
            name: "Marquer {prefix}conf suivi de `add`/ `edit`/ `del` pour ajouter, modifier ou supprimé un paramètre.",
            value: inspect(defaults),
          }
        ]
      }
    })
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["defaults"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "conf",
  category: "Owner",
  description: "Modifiez la configuration par défaut pour toutes les guildes.",
  usage: "conf <add/edit/del> <key> <value>"
};
