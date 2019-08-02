"use strict";
const talkedRecently = new Set();

exports.run = async (client, message, args) => {

  if (talkedRecently.has(message.author.id)) {
    return message.channel.send(`${message.author} Attendez 10 secondes avant de taper à nouveau ce qui suit`);
}

    var user = args[0];
    var text = args.slice(1).join(' ');

    if(!user) return message.channel.send("<:warn:600349289427894272> Vous devez entrer le pseudo twitter de quelqu'un sans le \"@\"!");
    if(!text) return message.channel.send("<:warn:600349289427894272> Vous devez entrer un message !");

    message.channel.send("Veuillez patientez").then(async m => {

        const { body } = await require('snekfetch').get(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`))
        message.channel.send(`Nouveau tweet de **${user}**`,{  
            files: [{   
                attachment: body.message,
                name: 'twt.png'
            }]
        }).then( () => m.delete());
    });
            
    talkedRecently.add(message.author.id);
        setTimeout(() => {
          
          talkedRecently.delete(message.author.id);
        }, 10000);
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
