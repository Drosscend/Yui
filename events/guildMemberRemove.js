'use strict';

const Canvas = require('canvas');
const axios = require('axios');

module.exports = async(client, member) => {

  const settings = client.getSettings(member.guild);

  if (settings.welcomeEnabled !== "true") return;

  function buffer(data) {
    return axios.get(data, {
        responseType: 'arraybuffer'
    })
    .then((res) => res.data)
    .catch(err => console.log(err));
  }

  function responsiveText(canvas, text) {
    const SizeCtx = canvas.getContext('2d');
    let fontSize = 18;
    do {
        SizeCtx.font = `bold ${fontSize -= 2}pt discord`;
    } while (SizeCtx.measureText(text).width > canvas.width - 15);
    return SizeCtx.font;
  }

  async function Welcome(data) {
    const canvas = Canvas.createCanvas(400, 200);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#303030';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = responsiveText(canvas, `A bientôt ${data.tag}`);//responsive text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`A bientôt ${data.tag}`, 200, 184);
    ctx.beginPath();
    ctx.arc(195, 84, 68, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(126, 15, 140, 140);
    ctx.beginPath();
    ctx.arc(195, 84, 64, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(await Canvas.loadImage(await buffer(data.displayAvatarURL)), 131, 20, 128, 128);
    return canvas.toBuffer();
  }

  member.guild.channels.find(c => c.name === settings.welcomeChannel).send({
    files: [{
      attachment: await Welcome(member.user),
      name: "welcome.png"
  }]
  });

};