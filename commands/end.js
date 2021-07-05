const Discord = require("discord.js");
fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if(message.author.id != 585653754888716290) return;

    const data = JSON.parse(fs.readFileSync(`./data-${args[0]}.json`, 'utf8' , (err, data) => {
        if (err) {
          message.channel.send("```\n" + err + "\n```");
          return;
        }
    }));

    const indexToEmoji = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    const votedUsers = [];

    const candidates = data.users;
    let votes = [];

    await candidates.forEach(async user => {

        const cacheChannel = bot.channels.cache.get(data.channelID); 
        const emoji = indexToEmoji[candidates.indexOf(user)];
        const fetchedMessage = await cacheChannel.messages.fetch(data.msgID);
        const reactions = await fetchedMessage.reactions.resolve(emoji).users.fetch().then(userList => {
            const returnedUserList = [];

            userList.map((user) => user.id).forEach(u => {
              if(!votedUsers.includes(u)) {
                returnedUserList.push(u);
                votedUsers.push(u);
              }
            });

            return returnedUserList;
        });
        await votes.push(reactions.length);
    });

    setTimeout(async () => {

  
      const highestVote = Math.max(...votes);
  
      const embed = new Discord.MessageEmbed()
        .setTitle("RESULTS")
        .setColor("#EE3030")
        .setImage("https://i.redd.it/dvj5rg226de41.jpg")
        .addField("The Winner Is", candidates[votes.indexOf(highestVote)])
        .setFooter(`With a total of ${highestVote - 1} votes`);
  
      await bot.channels.cache.get(data.channelID).send(embed);
    }, 1000);

}


module.exports.help = {
  name:"end"
}
