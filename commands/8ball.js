"use strict";

exports.run = async (client, message, args) => {

        // gets the question
        if(!args[0]) return message.channel.send("<:warn:600349289427894272> Veuillez taper une question!");

        // Gets the list of answers
        let replies = ["oui.", "non.", "peut-être.", "bien sûr que non.", "je ne sait pas.", "il est probable."];
        
        // determines which response will be sent
        let result = Math.floor((Math.random() * replies.length));

        // Send the answer
        message.channel.send(message.author.username+', '+replies[result]);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "Jouer au 8ball :)",
  usage: "8ball [question]"
};
