"use strict";

const { version } = require("discord.js");
const moment = require("moment");
  require("moment-duration-format");
const os = require("os");

exports.run = (client, message) => {

  const duration = moment.duration(client.uptime).format(" D [Jour(s)], H [heure(s)], m [minute(s)], s [secondes]");

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
      description: `<:browser1:600349429597470740> **Voici mes différentes statistiques**`,
      fields: [
        {
          name: "Uptime",
          value: duration,
        }, {
          name: "CPU",
          value: `${(os.loadavg()[0] * os.cpus().length / 100).toFixed(2)}%`,
          inline: true,
        }, {
          name: "RAM",
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
          inline: true,
        }, {
          name: "Version",
          value: `Discord.js: \`${version}\` | NodeJS: \`${process.version}\` | Bot: \`${require('../package.json').version}\``,
        }, {
          name: "Config",
          value: `\`\`\`${os.cpus()[0].model}\`\`\``,
        }, {
          name: "Utilisateurs",
          value: client.users.size.toLocaleString(),
          inline: true,
        }, {
          name: "Serveurs",
          value: client.guilds.size.toLocaleString(),
          inline: true,
        }, {
          name: "Channels",
          value: client.channels.size.toLocaleString(),
          inline: true
        }, {
          name: "Emojies",
          value: client.emojis.size.toLocaleString(),
          inline: true,
        }    
    ]
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["debug"],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Bot",
  description: "Donne quelques statistiques utiles sur moi.",
  usage: "stats"
};
