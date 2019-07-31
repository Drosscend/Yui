"use strict";
const Jikan = require("jikan-node");
const mal = new Jikan();

exports.run = async (client, message, args) => {

    try {
        const search = args.join(" ");
        if (!search) return message.channel.send("<:warn:600349289427894272> Vous devez spécifier un amimé.");

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

        mal.search("anime", search).then(info => {
            const id = info.results[0].mal_id;
            mal.findAnime(id).then(result => {
                if (result.length === 0) {
                    return message.channel.send(`Aucun résulatat pour **${search}**!`);
                }
                const anime = result;

                message.channel.send({embed: {
                    color: 0xDF9C9D,
                    thumbnail: {
                        url: anime.image_url.replace(/<[^>]*>/g, '')
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
                    description: `**Nom: **${anime.title}\n**Lien:** https://myanimelist.net/anime/${id}\n**Résumé: **${anime.synopsis ? (anime.synopsis.length <= 2048 ? anime.synopsis.replace(/<[^>]*>/g, '') : andanotheroutput(anime.synopsis.replace(/<[^>]*>/g, ''))) : '`N/A`'}`,
                    fields: [
                        {
                            name: "Titres alternatifs:",
                            value: `**anglais:** ${anime.title_english ? anime.title_english : anime.title}\n**synonymes:** ${anime.title_synonyms[0] ? anotheroutput(anime.title_synonyms) : '`N/A`'}\n**Japonais:** ${anime.title_japanese}`,
                        }, {
                            name: "Information:",
                            value: `**Type:** ${anime.type ? anime.type : '`N/A`'}\n**Episodes:** ${anime.episodes ? anime.episodes : '`N/A`'}\n**Status:** ${anime.status}\n**Diffusé:** ${anime.aired.string}\n**Durée:** ${anime.duration ? anime.duration : '`N/A`'}\n**Cote:** ${anime.rating ? anime.rating : '`N/A`'}`,
                        }
                    ]
                }})

            }).catch(err => {
                return message.channel.send("<:warn:600349289427894272> Une erreur est survenue avec l'API.");
            });
        }).catch(err => {
            return message.channel.send("<:warn:600349289427894272> Une erreur est survenue avec l'API.");
        });
    } catch(err) {
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
  name: "anime",
  category: "Divers",
  description: "Affiche des informations à propos d'un anime.",
  usage: "anime"
};
