module.exports = async client => {

  client.logger.log(`${client.user.tag} est prête à servir ${client.users.size} utilisateurs dans ${client.guilds.size} serveurs.`, "ready");

  client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
  
};
