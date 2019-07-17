'use strict';

module.exports = (client, guild) => {

  client.logger.cmd(`[GUILD LEAVE] ${guild.name} vient de m'éjecter.`);

  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }

};
