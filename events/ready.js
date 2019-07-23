"use strict";

const logo = require('asciiart-logo');

module.exports = async client => {

  await console.log(
    logo({
      name: `${client.user.username}`,
      font: 'Basic',
      lineChars: 15,
      padding: 5,
      margin: 2
    })
    .emptyLine()
    .wrap(`${client.user.username}#${client.user.discriminator} développé par Kévin.`)
    .render()
  );
  
  client.logger.log(`${client.user.tag} est prête à servir ${client.users.size -1} utilisateurs dans ${client.guilds.size} serveurs.`, "ready");

  client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});

};
