"use strict";

exports.run = async (client, message, args) => {

    var word = args[0];
    if(!word) return message.channel.send("<:warn:600349289427894272> Veuillez taper un mot!");

    message.channel.send("Veuillez patientez").then(m => {
        message.channel.send({
            files: [{
              attachment: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${word}`,
              name: `${word}.png` //.gif si c'est un gif
            }]
        }).then( () => m.delete());
    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "qrcode",
  category: "Utiles",
  description: "Affiche un QR Code avec votre mot !",
  usage: "qrcode [texte]"
};
