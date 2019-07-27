"use strict";

exports.run = async (client, message) => {

    if (!message.guild.voiceConnection) return message.channel.send("<:warn:600349289427894272> Je ne suis pas connectée dans un salon-vocal !")
                
    if (!message.member.voiceChannel) return message.channel.send("<:warn:600349289427894272> Vous devez être connecté dans un salon-vocal !")
                    
    if(!message.member.voiceChannel.speakable) return message.channel.send("<:warn:600349289427894272> Je n'ai pas la permission de `parler` dans ce salon !");


if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) return message.channel.send("<:warn:600349289427894272> Le bot ne joue pas !");

let args = message.content.split(" ");

if (parseInt(args[1]) > 100) return message.channel.send("<:warn:600349289427894272> Le volume est déjà à son maximum !");

message.guild.voiceConnection.player.dispatcher.setVolume((parseInt(args[1]) / 100));

message.channel.send(`🔊 Le volume est désormais à \`${parseInt(args[1])}/100\``);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "volume",
  category: "Music",
  description: "Change le volume de Yui.",
  usage: "volume"
};
