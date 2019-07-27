"use strict";

exports.run = async (client, message, args) => {

  if(!args[0]) return message.channel.send("<:warn:600349289427894272> Veuillez taper une question!");

  let replies = [

    "j'en suis certain.",
    "c'est décidément sur.",
    "sans aucun doute.",
    "oui, j'en suis sur et certain !",
    "probablement...",
    "oui !",
    "non !",
    "des signes me font dire oui...",
    "demandez à nouveau plus tard",
    "mieux vaut ne pas te le dire maintenant...",
    "je ne peux pas prédire maintenant.",
    "concentrez-vous et demandez à nouveau !",
    "ne compte pas la dessus.",
    "ma réponse est non.",
    "mes sources disent que non...",
    "oh... J'en doute !",
    "erreur système",
    "ma base de données vous concernat n'évoque pas de réponces à votre questions :/"

  ];
        
  let result = Math.floor((Math.random() * replies.length));

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
