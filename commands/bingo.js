"use strict";

exports.run = async (client, message, args) => {

    let limit = args[0];
    
    if(client.cooldown.bingo[message.guild.id]) {
        return message.channel.send("<:warn:600349289427894272> Quelqu'un est déja entrain de jouer au bingo merci de patienter.");
    }
    
    if(isNaN(limit)) {
        return message.channel.send("<:warn:600349289427894272> Veuillez taper un nombre!");
    }
    else if(!limit) {
        return message.channel.send("<:warn:600349289427894272> Veuillez taper un nombre!");
    }
    else if(limit < 1) {
        return message.channel.send("<:warn:600349289427894272> Veuillez taper un nombre supérieur ou égal à **1**!");
    }
    else if(limit > 1000) {
        return message.channel.send("<:warn:600349289427894272> Veuillez taper un nombre inférieur ou égal à **1000**!");
    }
    
      message.channel.send(`Vous avez **1** minute pour trouver un nombre compris entre **0** et **${Math.round(limit)}**. Bonne chance!`).then(async(m) => {
          const random = Math.floor(Math.random() * limit);
          const filter = m => m.author.id !== client.user.id;
          const collector = await m.channel.createMessageCollector(filter, { time: 60000 });

          client.cooldown.bingo[m.guild.id] = true;

          collector.on("collect", async(collected) => {
              if(collected.content.toLowerCase() === "annuler") {
                  return collector.stop(`✅ Bingo annulé !`);
              } else {
                  let response = await collected.content.trim();
                  response = parseInt(response);

                  if(isNaN(response)) {
                      return;
                  }
                  else if(response < random) {
                      return message.channel.send("C'est plus!");
                  }
                  else if(response > random) {
                      return message.channel.send("C'est moins!");
                  }
                  else if(response === random) {
                      await collector.stop(`Félicitation à ${collected.author.toString()} il a remporté le Bingo, le nombre était: **${random}**.`);
                  }
              }
          });
          collector.on("end", async(collected, reason) => {
              delete client.cooldown.bingo[m.guild.id];

              if(reason && reason !== "time") {
                  return message.channel.send(reason);
              } else {
                  return message.channel.send(`Personne n'a remporté le Bingo, le nombre était: **${random}**.`);
              }
          });
      });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bingo",
  category: "Fun",
  description: "Jouer au bingo :)",
  usage: "bingo [limite]"
};
