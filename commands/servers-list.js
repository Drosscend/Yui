"use strict";
const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description = 
        `Serveurs total : ${message.client.guilds.size}\n\n`+
        message.client.guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
        .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} membres | ${r.owner.user.tag}`)
        .slice(0, 10)
        .join("\n");

    let embed = new Discord.RichEmbed()
        .setTitle(`Page: ${page}/${Math.ceil(message.client.guilds.size/10)}`)
        .setDescription(description)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setThumbnail(client.user.displayAvatarURL)
        .setColor(0xDF9C9D);
    let msg = await message.channel.send(embed);

    await msg.react("⬅");
        await msg.react("➡");

        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on("collect", async(reaction, user) => {

            if(reaction._emoji.name === "⬅") {

                // Updates variables
                i0 = i0-10;
                i1 = i1-10;
                page = page-1;
                
                // if there is no guild to display, delete the message
                if(i0 < 0){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }
                
                description = `Serveurs Total: ${message.client.guilds.size}\n\n`+
                message.client.guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} membres | ${r.owner.user.tag}`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setTitle(`Page: ${page}/${Math.round(message.client.guilds.size/10)}`)
                .setDescription(description);
            
                // Edit the message 
                msg.edit(embed);
            
            };

            if(reaction._emoji.name === "➡"){

                // Updates variables
                i0 = i0+10;
                i1 = i1+10;
                page = page+1;

                // if there is no guild to display, delete the message
                if(i1 > message.client.guilds.size + 10){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }

                description = `Serveurs total: ${message.client.guilds.size}\n\n`+
                message.client.guilds.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} membres  | ${r.owner.user.tag}`)
                .slice(i0, i1)
                .join("\n");

                // Update the embed with new informations
                embed.setTitle(`Page: ${page}/${Math.round(client.guilds.size/10)}`)
                .setDescription(description);
            
                // Edit the message 
                msg.edit(embed);

            };

            // Remove the reaction when the user react to the message
            await reaction.users.remove(message.author.id);

        });

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slist"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "serveurlist",
  category: "Owner",
  description: "Affiche les serveur qui m'ont ajoutée.",
  usage: "serveurlist"
};
