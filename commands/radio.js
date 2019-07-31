"use strict";

exports.run = async (client, message) => {

    const radio = {
     
        "nrj": "http://185.52.127.155/fr/30001/mp3_128.mp3?origine=fluxradios",
        "skyrock": "http://icecast.skyrock.net/s/natio_mp3_128k",
        "fun": "http://streaming.radio.funradio.fr/fun-1-48-192",
        "nostalgie": "http://185.52.127.160/fr/30601/mp3_128.mp3?origine=fluxradios",
        "virgin": "http://vr-live-mp3-128.scdn.arkena.com/virginradio.mp3",
        "animenexus": "http://radio.animenexus.mx:8000/animenexus",
       
        "Nrj": "http://185.52.127.155/fr/30001/mp3_128.mp3?origine=fluxradios",
        "Skyrock": "http://icecast.skyrock.net/s/natio_mp3_128k",
        "Fun": "http://streaming.radio.funradio.fr/fun-1-48-192",
        "Nostalgie": "http://185.52.127.160/fr/30601/mp3_128.mp3?origine=fluxradios",
        "Virgin": "http://vr-live-mp3-128.scdn.arkena.com/virginradio.mp3",
        "Animenexus": "http://radio.animenexus.mx:8000/animenexus",
      
  }
  
  const thumbnail = {
       
        "nrj": "https://images-ext-2.discordapp.net/external/PIGjpF7N808S85Gx-BC_xUed8MXjXnhIkDcnrgeVGe8/https/cdn.discordapp.com/attachments/478335396275814400/478335455096471552/584826e6cef1014c0b5e49da.png",
        "skyrock": "https://images-ext-1.discordapp.net/external/4FpF0v4hlK-yR1TZOKtMWNDyK2adalOJ06tYAakaKAY/https/i.skyrock.net/5738/33265738/pics/photo_33265738_20.png",
        "fun": "https://images-ext-1.discordapp.net/external/TnO9NRTaKt3ATNOb05ARJO7gd1kKd2swFy7N-Cv0_E8/https/images-eu.ssl-images-amazon.com/images/I/61SBhLAGLNL.png",
        "nostalgie": "https://images-ext-1.discordapp.net/external/KyANIIEK2ck6Se74bnI1BxDR70H2ZjVT_4oGeQDa7II/https/upload.wikimedia.org/wikipedia/fr/0/0b/Nostalgie_logo_2015.png",
        "virgin": "https://images-ext-1.discordapp.net/external/6vZflI0U1GoIw0-4EDdoyPh_vtBeTMZgsxzgGxHQbiY/https/cdn.freebiesupply.com/logos/large/2x/virgin-1-logo-png-transparent.png",
        "animenexus": "https://blog.animenexus.mx/wp-content/themes/nexuriano/images/logo11.png",

        "Nrj": "https://images-ext-2.discordapp.net/external/PIGjpF7N808S85Gx-BC_xUed8MXjXnhIkDcnrgeVGe8/https/cdn.discordapp.com/attachments/478335396275814400/478335455096471552/584826e6cef1014c0b5e49da.png",
        "Skyrock": "https://images-ext-1.discordapp.net/external/4FpF0v4hlK-yR1TZOKtMWNDyK2adalOJ06tYAakaKAY/https/i.skyrock.net/5738/33265738/pics/photo_33265738_20.png",
        "Fun": "https://images-ext-1.discordapp.net/external/TnO9NRTaKt3ATNOb05ARJO7gd1kKd2swFy7N-Cv0_E8/https/images-eu.ssl-images-amazon.com/images/I/61SBhLAGLNL.png",
        "Nostalgie": "https://images-ext-1.discordapp.net/external/KyANIIEK2ck6Se74bnI1BxDR70H2ZjVT_4oGeQDa7II/https/upload.wikimedia.org/wikipedia/fr/0/0b/Nostalgie_logo_2015.png",
        "Virgin": "https://images-ext-1.discordapp.net/external/6vZflI0U1GoIw0-4EDdoyPh_vtBeTMZgsxzgGxHQbiY/https/cdn.freebiesupply.com/logos/large/2x/virgin-1-logo-png-transparent.png",
        "Animenexus": "https://blog.animenexus.mx/wp-content/themes/nexuriano/images/logo11.png",
   }
  
   if (!message.member.voiceChannel) return message.channel.send("<:warn:600349289427894272> Vous devez être connecté dans un salon-vocal.")
                
       if(!message.member.voiceChannel.joinable) return message.channel.send("<:warn:600349289427894272> Je n'ai pas la permission de `rejoindre` dans ce salon.");
                
       if(!message.member.voiceChannel.speakable) return message.channel.send("<:warn:600349289427894272> Je n'ai pas la permission de `parler` dans ce salon.");

       let args = message.content.split(" ").slice(1).join(" ").toLowerCase();
             
   if (!args) return message.channel.send(`Voici la liste des radios: **Fun**, **Nrj**, **Nostalgie**, **Skyrock**, **Virgin**`)

     if(!radio[args]) return message.channel.send(`<:warn:600349289427894272> Radio non-valide`)
    
    message.member.voiceChannel.join().then(connection => {

    require('http').get(radio[args], (res) => { 

      connection.playStream(res); 

      message.channel.send({
        embed: {
            color: 0xDF9C9D,
            author: {
                name: message.author.username,
                icon_url: message.author.displayAvatarURL
            },
            footer: {
                icon_url: client.user.displayAvatarURL,
                text: client.user.username
            },
            thumbnail: {
                url:thumbnail[args]
            },
            timestamp: new Date(),
            fields: [
                {
                name: "Radio:",
                value: args,
                inline: true,
                }, {
                name: "Lien:",
                value: radio[args],
                inline: true,
                }
            ]
        }
    })
    });

  });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "radio",
  category: "Music",
  description: "Ecouter la radio avec YUI.",
  usage: "radio"
};
