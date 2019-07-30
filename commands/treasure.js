const { get } = require("axios");

exports.run = async (client, message, args) => {

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


    get(`https://eclyssia-api.tk/api/v1/treasure?url=${member.user.displayAvatarURL}&username=${member.user.username}`, {  responseType: 'arraybuffer'})
        .then((response) => {
            message.channel.send("<:browser1:600349429597470740> Image **cry** générée par **neko-love.xyz**:",{
                file: {
                    attachment: response.data,
                    name: "treasure.png"
                }
            })
        
        })

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "treasure",
    category: "Images",
    description: "Affiche une image de type\"treasure\"",
    usage: "treasure"
  };
  