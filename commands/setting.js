"use strict";

exports.run = async (client, message, [action, key, ...value]) => {

  const settings = message.settings;
  const defaults = client.settings.get("default");
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
  
  if (action === "edit") {
    if (!key) return message.reply("<:warn:600349289427894272> Veuillez spécifier une clé à édité.");
    if (!settings[key]) return message.reply("<:warn:600349289427894272> Cette clé n'existe pas dans les réglages.");
    const joinedValue = value.join(" ");
    if (joinedValue.length < 1) return message.reply("<:warn:600349289427894272> Veuillez spécifier une nouvelle valeur.");
    if (joinedValue === settings[key]) return message.reply("<:barrier:600349286546276362> Ce paramètre à déja cette valeur.");
    
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    client.settings.set(message.guild.id, joinedValue, key);

    message.reply(`\`${key}\` à bien été éditée à \`${joinedValue}\`.`);
  } else
  
  if (action === "reset") {
    if (!key) return message.reply("<:warn:600349289427894272> Veuillez spécifiez une clée à réinitialiser.");
    if (!settings[key]) return message.reply("<:warn:600349289427894272> Cette clé n'existe pas dans les réglages.");
    if (!overrides[key]) return message.reply("<:warn:600349289427894272> Cette clée utilise déjà les valeurs par défaut.");
    
    const response = await this.client.awaitReply(message, `<:warn:600349289427894272> Êtes-vous sûr de vouloir réinitialise \`${key}\` à la valeur par défaut \`${defaults[key]}\`?. Répondres par **oui** ou **non**`);

    if (["y", "yes", "oui"].includes(response.toLowerCase())) {
      client.settings.delete(message.guild.id, key);
      message.reply(`${key} à bien été réinitialiser.`);
    } else
    if (["n","no","cancel", "non"].includes(response)) {
      message.reply(`La clée \`${key}\` à bien été remie à \`${settings[key]}\`.`);
    }
  } else {
    const array = [];
    Object.entries(settings).forEach(([key, value]) => {
      array.push(`- **${key}${"".repeat(20 - key.length)}**: \`${value}\``);
    });

    await message.channel.send({
      embed: {
        color: 0xDF9C9D,
        thumbnail: {
          url: client.user.displayAvatarURL,
        },
        description: `<:settings:600349289394470923> Voici les paramètre de ${message.guild.name}.`,
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
            name: "Marquer {prefix}setting suivi de `edit`/ `reset` pour modifier ou réinitialiser un paramètre.",
            value: `${array.join("\n")}`,
          }
        ]
      }
    })
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["settings"],
  permLevel: "Administrateur"
};

exports.help = {
  name: "setting",
  category: "Config",
  description: "Afficher ou modifier les paramètres de votre serveur.",
  usage: "setting [edit/reset] [key] [value]"
};
