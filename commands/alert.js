const Discord = require("discord.js");
const fs = require('fs');

const allowedOperators = ["586024151932731393", "585653754888716290"];

module.exports.run = async (bot, message, args) => {
    if(!allowedOperators.includes(message.author.id)) return message.channel.send("You do not have the perms to operate this bot. If you believe this is a mistake, contact `Crabo_#7498`");

    if(args.length < 1) {
        message.channel.send("Not enough args");
        return;
    }
    
    const text = args.join(" ");

    const guild = message.guild;

    const members = await guild.members.fetch();
    members.forEach(member => {
        console.log(member.user.name);
        console.log(member.user.bot);
        console.log(member.user);
        if(!member.user.bot) member.send(text);
    }); 
}   

module.exports.help = {
  name:"alert"
}
