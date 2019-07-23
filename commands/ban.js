"use strict";

exports.run = async (client, message, args) => {

    const settings = client.getSettings(message.guild);

    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send("<:forbidden:600349288823783449> Je n'es pas la permission **BAN_MEMBERS** sur ce serveur.");
    if (!args[0]) {
        return message.channel.send("<:warn:600349289427894272> Veuillez indiquer le nom d\'une personne.");
    }

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

    if (member.hasPermission("MANAGE_GUILD")) return message.channel.send("<:forbidden:600349288823783449> Je ne peux pas le ban, il doit avoir la permission de gérer le serveur.");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Aucune raison";

    var modlogs = message.guild.channels.find(c => c.name === settings.modLogChannel);
    if (!modlogs) return message.channel.send("Si vous voulez avoir un récapitulatif des sanctions merci de créer un channel **mod-log** ou d'en configurer un avec la commande \"setting\".")
     
    member.ban(reason).then( () => {
        message.channel.send(`<:banhamer:600352893140205572> **${member.user.username}** est bien ban, pour la raison: ${reason}`)
            
        modlogs.send({
            embed: {
                color: 0xDF9C9D,
                thumbnail: {
                    url: member.user.displayAvatarURL
                },
                footer: {
                    icon_url: client.user.displayAvatarURL,
                    text: client.user.username
                },
                timestamp: new Date(),
                fields: [
                    {
                    name: "Modérateur:",
                    value: message.author.username,
                    }, {
                    name: "Raison du ban:",
                    value: reason,
                    }, {
                    name: "Membre:",
                    value: member.user.username,
                    }
                ]
            }
        })

    })
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "ban",
  category: "Modération",
  description: "Ban la personne identifier avec possibilité de mettre une raison.",
  usage: "ban [member] (raison)"
};
