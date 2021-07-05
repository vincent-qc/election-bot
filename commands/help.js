const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const embed = new Discord.MessageEmbed()
        .setTitle("Github Documentation Here")
        .setURL("https://bit.ly/3yt3UpX");

    message.channel.send(embed);
}

module.exports.help = {
  name:"help"
}
