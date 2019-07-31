"use strict";
const Jikan = require("jikan-node");
const mal = new Jikan();

exports.run = async (client, message, args) => {

    try {
        const search = args.join(" ");
        if (!search) return message.channel.send("<:warn:600349289427894272> Vous devez spécifier un manga.");

        function output(a) {
            var s = a[0].name;
            for (var i = 1; i < a.length; i++) {
                s += ', ' + a[i].name;
            }
            return s;
        }
        function anotheroutput(a) {
            var s = a[0];
            for (var i = 1; i < a.length; i++) {
                s += ', ' + a[0];
            }
            return s;
        }
        function andanotheroutput(s) {
            let i = s.lastIndexOf(' ', 2047);
            if (i > 2044) {
                i = s.lastIndexOf(' ', i - 1);
            }
            console.log(i);
            return (s.substring(0, i + 1) + "...");
        }

        mal.search("manga", search).then(info => {
            const id = info.results[0].mal_id;
            mal.findManga(id).then(result => {
                if (result.length === 0) {
                    return message.channel.send(`Aucun résulatat pour **${search}**!`);
                }
                const manga = result;

                message.channel.send({embed: {
                    color: 0xDF9C9D,
                    thumbnail: {
                        url: manga.image_url.replace(/<[^>]*>/g, '')
                    },
                    author: {
                        name: message.author.username,
                        icon_url: message.author.displayAvatarURL
                    },
                    footer: {
                        icon_url: client.user.displayAvatarURL,
                        text: client.user.username
                    },
                    timestamp: new Date(),
                    description: `**Nom: **${manga.title}\n**Lien:** https://myanimelist.net/manga/${id}\n**Résumé: **${manga.synopsis ? (manga.synopsis.length <= 2048 ? manga.synopsis.replace(/<[^>]*>/g, '') : andanotheroutput(manga.synopsis.replace(/<[^>]*>/g, ''))) : '`N/A`'}`,
                    fields: [
                        {
                            name: "Titres alternatifs:",
                            value: `**anglais:** ${manga.title_english ? manga.title_english : manga.title}\n**synonymes:** ${manga.title_synonyms[0] ? anotheroutput(manga.title_synonyms) : '`N/A`'}\n**Japonais:** ${manga.title_japanese}`,
                        }, {
                            name: "Information:",
                            value: `**Type:** ${manga.type ? manga.type : '`N/A`'}\n**Volumes:** ${manga.volumes ? manga.volumes : '`N/A`'}\n**Chapitres:** ${manga.chapters ? manga.chapters : '`N/A`'}\n**Status:** ${manga.status}\n**Publié:** ${manga.published.string}`,
                        }
                    ]
                }})

            })

        })
    } catch(err) {
        console.log(err)
        return message.channel.send("<:warn:600349289427894272> Une erreur est survenue avec l'API.");
    }
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "manga",
  category: "Divers",
  description: "Affiche des informations à propos d'un manga.",
  usage: "manga"
};
