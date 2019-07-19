'use strict';

module.exports = async (client, message) => {

  if (message.author.bot) return;

  const settings = message.settings = client.getSettings(message.guild);

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`Mon prefix dans ce serveur est \`${settings.prefix}\``);
  }

  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  const level = client.permlevel(message);

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  if(!cmd.conf.enabled)  
    return message.channel.send("<:excavator:600349287141998603> La commande est désactivée pour le moment.");

  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("<:barrier:600349286546276362> Cette commande n'est pas disponible par message privé. Veuillez exécuter cette commande dans un serveur.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`<:forbidden:600349288823783449> Vous n'avez pas la permission d'utiliser cette commande, votre niveau de privilège est **${level}**, \`${client.config.permLevels.find(l => l.level === level).name}\` et le niveau de privilère demandé est **${client.levelCache[cmd.conf.permLevel]}** \`${cmd.conf.permLevel}\`.`);
    } else {
      return;
    }
  }

  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} exécute la commande ${cmd.help.name}.`);
  cmd.run(client, message, args, level);
  
  /*Début du système de rank*/

  if (settings.welcomeEnabled !== "true") return;

  if (!client.ranking.get(message.guild.id).members[message.author.id]) {
    const database = client.ranking.get(message.guild.id);
    //console.log(database);
    database.members[message.author.id] = {
        _id: message.author.id,
        exp: 0,
        nextexp: 125,
        exptotal: 0,
        level: 1,
        nextlevel: 2,
        cooldown: 0,
    };
    client.ranking.set(message.guild.id, database);
    console.log(`[Database] Member ${message.author.tag} add database`);
}

const userdb = client.ranking.get(message.guild.id);

if ((userdb.members[message.author.id].cooldown > Date.now()) && (userdb.members[message.author.id].cooldown !== 0)) {
    userdb.members[message.author.id].cooldown - new Date().getTime();
} else {
    userdb.members[message.author.id].cooldown = Date.now() + 2000;
    userdb.members[message.author.id].exp += 10;
    if (userdb.members[message.author.id].exp >= userdb.members[message.author.id].nextexp) {
        userdb.members[message.author.id].nextexp = ((userdb.members[message.author.id].nextlevel*200)/2) + 19;
        userdb.members[message.author.id].exptotal += userdb.members[message.author.id].exp;
        userdb.members[message.author.id].exp = 0;
        userdb.members[message.author.id].level++;
        userdb.members[message.author.id].nextlevel++;
        message.channel.send(`Niveau suivant pour ${message.author.tag} => ${userdb.members[message.author.id].level}`);
    }
    client.ranking.set(message.guild.id, userdb);
}
/*Fin du système de rank*/

};
