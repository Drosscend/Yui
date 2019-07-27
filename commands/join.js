"use strict";

exports.run = async (client, message) => {

    if (!message.member.voiceChannel) return message.channel.send("<:warn:600349289427894272> Vous devez être connecté dans un salon-vocal.")
                
    if(!message.member.voiceChannel.joinable) return message.channel.send("<:warn:600349289427894272> Je n'ai pas la permission de `rejoindre` dans ce salon.");
             
    if(!message.member.voiceChannel.speakable) return message.channel.send("<:warn:600349289427894272> Je n'ai pas la permission de `parler` dans ce salon.");

    message.member.voiceChannel.join().then(connection => {

        message.channel.send("J'ai rejoint le channel avec succès.");

    });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "join",
  category: "Music",
  description: "Fait rejoindre Yui au channel ou vous êtes.",
  usage: "join"
};
