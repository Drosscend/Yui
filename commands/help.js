"use strict";

exports.run = (client, message, args, level) => {
  if (!args[0]) {
    let embedFields = [];
    embedFields.push({
      name: "**Owner**",
      value: client.commands.filter(filters => filters.help.category === "Owner")
        .map(name => name.help.name).join(", "),
    });
    embedFields.push({
      name: "**Bot**",
      value: client.commands.filter(filters => filters.help.category === "Bot")
        .map(name => name.help.name).join(", "),
    });
    embedFields.push({
      name: "**Modération**",
      value: client.commands.filter(filters => filters.help.category === "Modérasion")
       .map(name => name.help.name).join(", "),
    });
//    embedFields.push({
//      name: "**Divers**",
//     value: client.commands.filter(filters => filters.help.category === "Divers")
//        .map(name => name.help.name).join(", "),
//    });
//    embedFields.push({
//      name: "**Fun**",
//      value: client.commands.filter(filters => filters.help.category === "Fun")
//        .map(name => name.help.name).join(", "),
//    });
//    embedFields.push({
//      name: "**Musique**",
//      value: client.commands.filter(filters => filters.help.category === "Music")
//        .map(name => name.help.name).join(", "),
//    });

    message.channel.send({
      embed: {
        color: 0xDF9C9D,
        thumbnail: {
          url: client.user.displayAvatarURL
        },
        author: {
          name: message.author.username,
          icon_url: message.author.displayAvatarURL
        },
        footer: {
          icon_url: client.user.displayAvatarURL,
          text: client.user.username
        },
        timestamp: new Date(),
        description: `Utilisez \`${message.settings.prefix}help <command>\` pour plus de détails sur une commande. | ${client.commands.size} commandes.`,
        fields: embedFields,
      }
    });
  }
  if (args[0]) {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);

      message.channel.send({
        embed: {
          color: 0xDF9C9D,
          thumbnail: {
            url: client.user.displayAvatarURL
          },
          author: {
            name: message.author.username,
            icon_url: message.author.displayAvatarURL
          },
          footer: {
            icon_url: client.user.displayAvatarURL,
            text: client.user.username
          },
          description: `Description de la commande **${command.help.name}**`,
          timestamp: new Date(),
          fields: [{
            name: "**Description:**",
            value: `${command.help.description}`
          }, {
            name: "**Usage:**",
            value: `${command.help.usage}`,
          }, {
            name: "**Category:**",
            value: `${command.help.category}`,
            inline: true
          }, {
            name: "**Aliases:**",
            value: `${command.conf.aliases == 0 ? "Aucun" : command.conf.aliases}`,
            inline: true
          }, {
            name: "**Enabled:**",
            value: `${command.conf.enabled === true ? "<:online:600352893673013268> Oui" : "<:dnd:600352893450715146> Non"}`,
            inline: true
          }, {
            name: "**GuildOnly:**",
            value: `${command.conf.guildOnly}`,
            inline: true
          }, {
            name: "**Perm level:**",
            value: `${command.conf.permLevel}`,
            inline: true
          }]
        }
      });
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "Bot",
  description: "Affiche toutes les commandes disponibles pour votre niveau d'autorisation.",
  usage: "help [commande]"
};
