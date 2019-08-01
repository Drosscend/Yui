"use strict";
const ms = require("ms");
const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send("<:forbidden:600349288823783449> Je n'es pas la permission **MANAGE_CHANNELS** sur ce serveur.");

    if (!client.lockit) client.lockit = [];
    const time = args.join(" ");
    const validUnlocks = ["release", "rel", "unlock", "end", "stop"];
    if (!time) return message.channel.send("<:warn:600349289427894272> Une durée pour le verrouillage doit être définie. Cela peut se faire en heures, minutes ou secondes. Example:`{prefix}lockdown 5 m`");
    try {
        if (validUnlocks.includes(time)) {
            message.guild.channels.forEach(ch => ch.overwritePermissions(member.user, {SEND_MESSAGES:false,ADD_REACTIONS:false}))
            .then(() => {
                message.channel.send("Verrouillage terminé.");
                clearTimeout(client.lockit[message.channel.id]);
                delete client.lockit[message.channel.id];
            }).catch(err => {
                return message.channel.send("<:warn:600349289427894272> Une erreur est survenue.");
            });
        } else {
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES:false,
                ADD_REACTIONS:false
            }).then(() => {

                const embed = new RichEmbed()
                    .setTitle("🔒 Canal verrouillé")
                    .setColor(0x00FFFF)
                    .setDescription(`\`\`\`ruby\nChannel: #${message.channel.name} (${message.channel.id})\Durée: ${ms(ms(time), { long: true })}\nÉmis par: ${message.author.tag}\`\`\``)
                    .setTimestamp();
                message.channel.send({embed})

                    .then(() => {
                        client.lockit[message.channel.id] = setTimeout(() => {
                            message.channel.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: null
                            })
                            .then(message.channel.send("Verrouillage terminé."));
                            delete client.lockit[message.channel.id];
                        }, ms(time));
                });
            }).catch(err => {
                return message.channel.send("<:warn:600349289427894272> Une erreur est survenue.");
            });
        }
    } catch(err) {
        return message.channel.send("<:warn:600349289427894272> Une erreur est survenue.");
    }

    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "lockdown",
  category: "Modération",
  description: "Verrouille un canal pendant une durée définie. Utilisez \"lockdown stop\" pour mettre fin au verrouillage.",
  usage: "lockdown [duration] [sec|min|hr]"
};
