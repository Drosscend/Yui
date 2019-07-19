"use strict";

exports.run = async (client, message, args) => {

    let collection = message.attachments.find(url => url);
    const attachment = async (request) => {
        return message.content.split(/\s+/).filter((res) => res.toLowerCase().indexOf(request) > -1)
    };
    let proxy = attachment('http');
    const res_Proxy = Promise.resolve(proxy);

    try {
        res_Proxy.then(async (value) => {
            let res = value[0] ? value[0] : collection ? collection.proxyURL : ' ';
            let format_IMG = [".png", ".jpeg", ".jpg", ".gif", ".webp"];
            if (!format_IMG.some(res_data => res.toLowerCase().includes(res_data))) return message.channel.send('<:warn:600349289427894272> image invalide');
            client.user.setAvatar(res, client);
            message.channel.send({
                embed: {
                    description: `**Avatar actualisés**`,
                    color: 0xDF9C9D,
                    thumbnail: {
                        url: member.user.displayAvatarURL
                    },
                    footer: {
                        icon_url: client.user.displayAvatarURL,
                        text: client.user.username
                    },
                    timestamp: new Date(),
                    image: {
                        url: res
                    },
                }
            });
        });
    } catch (err) {
        message.channel.send(`<:warn:600349289427894272> Une erreur est survenue avec l'avata: \`\`\`${err}\`\`\``)
    };

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "setavatar",
  category: "Owner",
  description: "Change l'avatar de Yui.",
  usage: "setavatar [fichier]"
};