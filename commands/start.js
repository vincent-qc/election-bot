const Discord = require("discord.js");
const fs = require('fs');

const allowedOperators = ["586024151932731393", "585653754888716290"];

module.exports.run = async (bot, message, args) => {
    if(Math.random() > 0.95) return message.channel.send(new Discord.MessageEmbed().setTitle("An Exception has occured - Full details here").setURL("https://www.youtube.com/watch?v=oHg5SJYRHA0"));

    if(!allowedOperators.includes(message.author.id)) return message.channel.send("You do not have the perms to operate this bot. If you believe this is a mistake, contact `Crabo_#7498`");

    if(args.length < 3) {
        message.channel.send("Not enough args");
        return;
    }
    
    const channel = bot.channels.cache.get(args[0]);
    let allowMultipleVotes;

    if((args[args.length - 1].toLowerCase() === "true")) {
        allowMultipleVotes = true;
    } else if((args[args.length - 1].toLowerCase() === "false")) {
        allowMultipleVotes = false;
    } else {
        return message.channel.send("Last args must be boolean");
    }

    let embedMessage = "";

    const candidates = args.slice(1, args.length - 2);

    const indexToEmoji = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    candidates.forEach(item => {
        embedMessage += `${indexToEmoji[candidates.indexOf(item)]} - ${item} \n\n`;
    })

    const embed = new Discord.MessageEmbed()
        .setColor("#EE3030")
        .setTitle("Welcome to the Election")
        .setDescription("PLEASE REMEMBER TO ONLY VOTE FOR ONE CANDIDATE\nEXTRA VOTES WILL **NOT** BE COUNTED")
        //.setURL("https://www.youtube.com/watch?v=oHg5SJYRHA0")
        .setImage("https://i.imgur.com/NzXBam8.png`")
        .addField("CANDIDATES", embedMessage, true)
        .setFooter("Please remember to vote. Voting will only last for a period of time");


    if(Math.random() > 0.9) embed.setURL("https://www.youtube.com/watch?v=oHg5SJYRHA0");

    const msg = await channel.send(embed);

    for(let i = 0; i < candidates.length; i++) {
        await msg.react(indexToEmoji[i]);
    }

    const data = {
        msgID: msg.id,
        channelID: args[0],
        users: candidates,
        multipleVotes: allowMultipleVotes,
    }

    fs.writeFile(`./data-${args[args.length - 2]}.json`, JSON.stringify(data), function(err) {
        if(err) {
            message.channel.send("```\n" + err + "\n```");
            return;
        }
        console.log("The file was saved!");
    }); 
    
}   

module.exports.help = {
  name:"start"
}
