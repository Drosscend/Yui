"use strict";

exports.run = async (client, message, args) => {

    let replies = ["0", "2"];
    let pile = Math.floor((Math.random() * replies.length))=== 1;
    if(pile) return message.channel.send(":game_die: | C'est **pile** !")
    else return message.channel.send(":game_die: | C'est **face** !");

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "flip",
  category: "Fun",
  description: "Je lance les dés pour vous !",
  usage: "flip"
};
