'use strict';

module.exports = (client, guild) => {

  client.logger.cmd(`[GUILD JOIN] ${guild.name} vient de m'ajouter. Propriétaire: ${guild.owner.user.tag}.`);

};
