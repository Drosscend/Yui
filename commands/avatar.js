"use strict";

exports.run = async (client, message, args) => {

    const search = args.slice(0)[0];

    let {member} = message;
    if (message.mentions.members.size > 0) {
        member = message.mentions.members.first();
    } else if (search) {
            member = client.findersUtil.findMember(message.guild, search);
        if (member.size === 0) {
            return message.channel.send(`<:warn:600349289427894272> Aucun membre n'a été trouvé avec: \`${search}\`!`);
        } else if (member.size === 1) {
            member = member.first();
        } else {
            return message.channel.send(client.findersUtil.formatMembers(client, member));
        }
    };

        message.channel.send({
            embed: {
                color: 0xDF9C9D,
                author: {
                    name: message.author.username,
                    icon_url: message.author.displayAvatarURL
                },
                footer: {
                    icon_url: client.user.displayAvatarURL,
                    text: client.user.username
                },
                timestamp: new Date(),
                description: `Avatar de **${member.user.username}**: [Lien](${member.user.displayAvatarURL})`,
                image: {
                    url: member.user.displayAvatarURL
                },
            }
        })
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "avatar",
  category: "Divers",
  description: "Affiche votre avatar ou celui de la personne identifier",
  usage: "avatar (member)"
};
