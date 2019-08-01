'use strict';

module.exports = (client, guild) => {

  client.logger.debug(`[GUILD JOIN] ${guild.name} vient de m'ajouter. Propriétaire: ${guild.owner.user.tag}.`);
  client.channels.get("606360729158680586").send(`[GUILD JOIN] **${guild.name}** (${guild.id}) vient de m'ajouter. Propriétaire: **${guild.owner.user.tag}**.`)
};
