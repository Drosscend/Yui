"use strict";

exports.run = async (client, message, args) => {

    var user = args[0];
    var text = args.slice(1).join(' ');

    if(!user) return m.edit("<:warn:600349289427894272> Vous devez entrer le pseudo twitter de quelqu'un sans le \"@\"!");
    if(!text) return m.edit("<:warn:600349289427894272> Vous devez entrer un message !");

    message.channel.send("Veuillez patientez").then(async m => {

        const { body } = await require('snekfetch').get(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`))
        message.channel.send(`Nouveau tweet de **${user}**`,{  
            files: [{   
                attachment: body.message,
                name: 'twt.png'
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
  name: "tweet",
  category: "Fun",
  description: "Génère un tweet d'une personne de votre choix sur Twitter grâce à l'api nekobot !",
  usage: "tweet @discordapp  Hello World !"
};
