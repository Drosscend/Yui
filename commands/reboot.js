"use strict";

exports.run = async (client, message) => {
  await message.reply("<:settings:600349289394470923> je vais me coucher.");
  await Promise.all(client.commands.map(cmd =>
    client.unloadCommand(cmd)
  ));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reboot",
  category: "Bot",
  description: "Arrête le bot. Si le bot fonctionne sous PM2, il redémarre automatiquement.",
  usage: "reboot"
};