'use strict';

module.exports = (client, guild) => {

  client.logger.debug(`[GUILD LEAVE] ${guild.name} vient de m'éjecter.`);

  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }

};
