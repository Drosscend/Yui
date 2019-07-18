"use strict";

const findersUtil = {

    findMember(guild, query) {
        const search = query.toLowerCase();
        return guild.members.filter(m => m.displayName.toLowerCase().includes(search) ||
            m.user.tag.toLowerCase().includes(search) ||
            m.id === search);
    },
    formatMembers(client, list) {
        let message = `J'ai trouver **${list.size}** membres:\n${list.first(5).map(m => `- **${m.user.tag}**`).join('\n')}\n`;
        if (list.size > 5) message += `et ${(list.size - 5)} en plus...`;
        return message;
    }
};

module.exports = findersUtil;