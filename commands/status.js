"use strict";

exports.run = async (client, message, args) => {

    const status = args[0];
    if (!status) return message.channel.send("<:warn:600349289427894272> Un type de statut doit être fourni.");
    const statusType = args[0].toLowerCase();
    if (statusType === "online" || statusType === "idle" || statusType === "dnd" || statusType === "invisible") {
        client.user.setStatus(status);
        message.channel.send(`Status changée en **${statusType}**.\nVeuillez noter que le changement initial de statut peut prendre jusqu'à une minute ou deux.`);
    } else {
        return message.channel.send(`"${statusType}" n'est pas un type de statut valable.`);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "status",
  category: "Owner",
  description: "Définit la présence/le statut de Yui.",
  usage: "status"
};
