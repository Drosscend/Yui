"use strict";

exports.run = async (client, message) => {
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! La temps de latence est de ${msg.createdTimestamp - message.createdTimestamp}ms. Le temps de latence de l'API est ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Bot",
  description: "Donne la latence du bot et de l'api.",
  usage: "ping"
};
