"use strict";
var Ascii = require('ascii-art');

exports.run = async (client, message, args) => {

        // Gets the text 
        var text = args.join(' ');
        if(!text || text.length > 20) return message.channel.send("<:warn:600349289427894272> Veuillez entrer un texte valide (inférieur à 20 caractères) !");
    
        Ascii.font(text, 'Doom', function(rendered){
            message.channel.send('```'+rendered+'```');
        });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ascii",
  category: "Fun",
  description: "Transforme votre texte en caractères ascii !",
  usage: "ascii [texte]"
};
