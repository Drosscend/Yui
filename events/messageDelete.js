'use strict';

module.exports = (client, message) => {
    
    if (message.author.bot) return;

    const settings = client.getSettings(message.guild);
    
    var logs = message.guild.channels.find(c => c.name === settings.LogChannel);
    if (!logs) return;
    
    logs.send({
        embed: {
            color: 0xDF9C9D,
            footer: {
                icon_url: client.user.displayAvatarURL,
                text: client.user.username
            },
            thumbnail: {
                url: message.author.displayAvatarURL
            },
            timestamp: new Date(),
            description: `Message de **${message.author.username}** supprimé dans le channel **${message.channel}**.`,
            fields: [{
                    name: "Autheur:",
                    value: message.author.username,
                }, {
                    name: "Message:",
                    value: `\`\`\`${message}\`\`\``,
                }]
        }
    })
};
