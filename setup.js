const inquirer = require("inquirer");
const Enmap = require("enmap");
const fs = require("fs");

let baseConfig = fs.readFileSync("./config_base.txt", "utf8");

const defaultSettings = {
  "prefix": "yui!",
  "modLogChannel": "mod-log",
  "LogChannel": "log",
  "modRole": "Moderateur",
  "adminRole": "Administrateur",
  "welcomeChannel": "welcome",
  "welcomeEnabled": "false"
};

const settings = new Enmap({
  name: "settings",
  cloneLevel: 'deep',
  ensureProps: true
});


let prompts = [
  {
    type: "list",
    name: "resetDefaults",
    message: "Voulez-vous réinitialiser les paramètres par défaut ?",
    choices: ["Oui", "Non"]
  },
  {
    type: "input",
    name: "token",
    message: "Veuillez entrer le bot token à partir de la page d'application."
  },
  {
    type: "input",
    name: "ownerID",
    message: "Veuillez entrer l'id du propriétaire du bot."
  },
  {
    type: "input",
    name: "admins",
    message: "Veuillez entrer l'id de l'amin du bot."
  },
  {
    type: "input",
    name: "support",
    message: "Veuillez entrer l'id' du support du bot."
  },
  {
    type: "input",
    name: "fortnite",
    message: "Veuillez entrer le token de l'api fortnite."
  },
];

(async function () {
  console.log("Configuration de Yui...");
  await settings.defer;
  if (!settings.has("default")) {
    prompts = prompts.slice(1);
    console.log("Insertion des paramètres par défaut de la guilde dans la base de données...");
    await settings.set("default", defaultSettings);
  }

  const answers = await inquirer.prompt(prompts);

  if (answers.resetDefaults && answers.resetDefaults === "Yes") {
    console.log("Réinitialisation des paramètres par défaut des guildes...");
    await settings.set("default", defaultSettings);
  }

  baseConfig = baseConfig
    .replace("{{ownerID}}", answers.ownerID)
    .replace("{{admins}}", answers.admins)
    .replace("{{support}}", answers.support)
    .replace("{{token}}", `"${answers.token}"`)
    .replace("{{fortnite}}", `"${answers.fortnite}"`);

  fs.writeFileSync("./config.js", baseConfig);
  console.log("N'OUBLIEZ JAMAIS DE NE JAMAIS PARTAGER VOTRE TOKEN AVEC QUI QUE CE SOIT !");
  console.log("La configuration a été écrite, profitez-en !");
  await settings.close();
}());