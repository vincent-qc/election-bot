const Discord = require("discord.js");
const fs = require('fs');

const allowedOperators = ["586024151932731393", "585653754888716290"];

module.exports.run = async (bot, message, args) => {
    if(!allowedOperators.includes(message.author.id)) return message.channel.send("You do not have the perms to operate this bot. If you believe this is a mistake, contact `Crabo_#7498`");

    if(args.length < 2) {
        message.channel.send("Not enough args");
        return;
    }
    
    bot.channels.cache.get(args[0]).send(`@everyone, **An annoucement has been made by** ${message.author}\n\n` + "```" + args.slice(1).join(" ") + "```");
}   

module.exports.help = {
  name:"annouce"
}
