"use strict";

exports.run = async (client, message, args) => {
  const code = args.join(" ");
  if (code.length === 0) return message.channel.send("<:warn:600349289427894272> Aucun code à évaluer veuillez en fournir un.");
  try {
    let evaled = eval(code);
    if (typeof evaled !== 'string');
    evaled = require('util').inspect(evaled);
    evaled = evaled.replace(client.token, "Non mon token reste privée.");
    const MAX_CHARS = 8 + evaled.length;
    if (MAX_CHARS > 2000) {
      message.channel.send("<:download:600349429329035345> Trop de caractères dans le résultat de l'évaluation vous pouvez téléchargez le fichier joint pour avoir tout les détails.", { files: [{ attachment: Buffer.from(evaled), name: "output.txt" }] });
    };
    message.channel.send(`\`\`\`js\n${evaled.substr(0, 1850)}\`\`\``).then(async (res) => {
      await res.react('✅')
    });
  } catch (err) {
    message.channel.send(`\`\`\`js\n${err}\`\`\``).then(async (res) => {
      await res.react("❌");
    });
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "eval",
  category: "Bot",
  description: "Évalue le code Javascript.",
  usage: "eval [...code]"
};
