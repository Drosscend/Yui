const { get } = require("axios");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {

    if (talkedRecently.has(message.author.id)) {
        return message.channel.send(`${message.author} Attendez 10 secondes avant de taper à nouveau ce qui suit`);
    }
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


    get(`https://eclyssia-api.tk/api/v1/jackolantern?url=${member.user.displayAvatarURL}`, {  responseType: 'arraybuffer'})
        .then((response) => {
            message.channel.send("<:picture:605752181173256202> Image **jackolantern** générée par **eclyssia-api.tk**:",{
                file: {
                    attachment: response.data,
                    name: "jackolantern.png"
                }
            })
        
        })
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          
          talkedRecently.delete(message.author.id);
        }, 10000);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "jackolantern",
    category: "Images",
    description: "Affiche une image de type\"jackolantern\"",
    usage: "jackolantern"
  };
  