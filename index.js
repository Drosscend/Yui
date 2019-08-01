if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 ou une version supérieur est requise.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

const { Provider, Client: PictURLClient } = require("pict-url");
const Imgur = Provider.Imgur, Pict = new PictURLClient(Imgur);

const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

client.config = require("./config.js");

client.logger = require("./modules/Logger");

require("./modules/functions.js")(client);

client.commands = new Enmap();

client.aliases = new Enmap();

client.settings = new Enmap({name: "settings"});

client.cooldown = {bingo: {}};

client.pictURL = Pict;

const init = async () => {

  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Chargement d'un total de ${cmdFiles.length} commandes.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  client.logger.log("===================================================");
  client.logger.log(`Chargement d'un total de ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Event ${eventName} chargé.`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  const Modules = await readdir("./modules/");
  client.logger.log("===================================================");
  client.logger.log(`Chargements d'un total de ${Modules.length} modules.`);
  Modules.forEach(file => {
    const moduleName = file.split(".")[0];
    client.logger.log(`Chargement du module: ${moduleName}.`);
    const fonctions = require(`./modules/${file}`);
    client[file.split('.')[0]] = fonctions;
  });
  
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);

};

init();
