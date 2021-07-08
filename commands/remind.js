const Discord = require("discord.js");
const allowedOperators = ["586024151932731393", "585653754888716290"];

module.exports.run = async (bot, message, args) => {
    if(!allowedOperators.includes(message.author.id)) return message.channel.send("You do not have the perms to operate this bot. If you believe this is a mistake, contact `Crabo_#7498`");
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
      message.channel.send("An error has occured");
    }
    
    const channel = bot.channels.cache.get(args[0]);
    channel.send("@everyone **Remember to vote!**");
}

module.exports.help = {
  name:"remind"
}
