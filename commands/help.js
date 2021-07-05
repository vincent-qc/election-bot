const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const embed = new Discord.MessageEmbed()
        .setTitle("Github Documentation Here")
        .setURL("https://bit.ly/3yt3UpX")
        .addField("For now, Only Ewan and Vincent can operate this bot (as i don't want anyone DDoSing me internally");

    message.channel.send(embed);
}

module.exports.help = {
  name:"help"
}
