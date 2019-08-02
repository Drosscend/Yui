"use strict";

exports.run = async (client, message, args) => {

    const settings = client.getSettings(message.guild);

    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send("<:forbidden:600349288823783449> Je n'es pas la permission **MANAGE_CHANNELS** sur ce serveur.");
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send("<:forbidden:600349288823783449> Je n'es pas la permission **MANAGE_ROLES** sur ce serveur.");

    if (!args[0]) {return message.channel.send("<:warn:600349289427894272> Veuillez indiquer le nom d\'une personne.");}

    var reason = args.slice(1).join(' ');
    if (!reason) reason = "Aucune raison";
    
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

    if (member.hasPermission("MANAGE_GUILD")) return message.channel.send("<:forbidden:600349288823783449> Je ne peux pas le mute, il doit avoir la permission de gérer le serveur.");

    let muterole = message.guild.roles.find(x => x.name === "muted");

    if (member.roles.has(muterole.id)) return message.channel.send(`**${member.user.tag}** est déja mute.`);

    if(!muterole){
        try{
          muterole = await message.guild.createRole({
            name: "muted",
            color: "#000000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }catch(e){
          message.channel.send(`<:forbidden:600349288823783449> Une erreur est survenue.\n \`\`\`JS\n${e.stack}\`\`\``);
        }
      }

    await(member.addRole(muterole.id))
    .then((member) => {
        return message.channel.send(`**${member.user.tag}** est mute pour **${reason}** !\nPenssez que le role \`muted\` est en dessus du rôle de la personne à mute.`);
    })

    var modlogs = message.guild.channels.find(c => c.name === settings.modLogChannel);
    if (!modlogs) return message.channel.send("Si vous voulez avoir un récapitulatif des sanctions merci de créer un channel **mod-log** ou d'en configurer un avec la commande \"setting\".")
            
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
                    name: "Raison du mute:",
                    value: reason,
                    }, {
                    name: "Membre:",
                    value: member.user.username,
                    }
                ]
            }
        })
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "mute",
  category: "Modération",
  description: "Empêche le membre de parler.",
  usage: "mute [membre] (reason)"
};
