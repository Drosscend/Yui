"use strict";

exports.run = async (client, message, args) => {

    const settings = message.settings;
    const defaults = client.settings.get("default");
    const overrides = client.settings.get(message.guild.id);
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    const action = args[0];
    const joinedValue = args[1];

    const key = 'prefix';

    if (action === "edit") {
        if (!joinedValue) return message.reply("<:warn:600349289427894272> Veuillez spécifier une nouvelle valeur.");
        if (joinedValue === settings[key]) return message.reply("<:barrier:600349286546276362> Ce paramètre à déja cette valeur.");

        if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

        client.settings.set(message.guild.id, joinedValue, key);

        message.reply(`Le prefix à bien été éditée à \`${joinedValue}\`.`);
    } else

        if (action === "reset") {
            if (!overrides[key]) return message.reply("<:warn:600349289427894272> Cette clée utilise déjà les valeurs par défaut.");

            const response = await client.awaitReply(message, `<:warn:600349289427894272> Êtes-vous sûr de vouloir réinitialise le prefix à la valeur par défaut \`${defaults[key]}\`?. Répondres par **oui** ou **non**`);

            if (["y", "yes", "oui"].includes(response.toLowerCase())) {
                client.settings.delete(message.guild.id, key);
                message.reply(`Le prefix à bien été réinitialiser.`);
            } else
                if (["n", "no", "cancel", "non"].includes(response)) {
                    message.reply(`Le prefix à bien été remie à \`${settings[key]}\`.`);
                }
        } else {
            message.channel.send(`Mon prefix dans ce serveur est \`${settings.key}\`.\nPour le modifier taper \`${settings.key}setprefix edit votreprefix\`.\nPour le réinitialisez taper \`${settings.key}setprefix reset\`.`)
        }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrateur"
};

exports.help = {
    name: "setprefix",
    category: "Config",
    description: "Afficher ou modifier le prefix de votre serveur.",
    usage: "setprefix [edit/reset] [prefix]"
};
