'use strict';

module.exports = (client, guild) => {

  client.logger.debug(`[GUILD LEAVE] ${guild.name} vient de m'éjecter.`);
  client.channels.get("606360729158680586").send(`[GUILD LEAVE] **${guild.name}** (${guild.id}) vient de m'éjecter. Propriétaire: **${guild.owner.user.tag}**.`)

  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }

};
