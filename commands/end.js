const Discord = require("discord.js");
fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if(message.author.id != 585653754888716290) return;
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
    }));

    const indexToEmoji = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    const msg = message.channel.messages.fetch(data.id);

    const candidates = data.users;
    let votes = [];

    await candidates.forEach(async user => {

        const cacheChannel = bot.channels.cache.get(data.channelID); 
        const emoji = indexToEmoji[candidates.indexOf(user)];
        const fetchedMessage = await cacheChannel.messages.fetch(data.msgID);
        const reactions = await fetchedMessage.reactions.resolve(emoji).users.fetch().then(userList => {
            return userList.map((user) => user.id)
        });
        await votes.push(reactions.length);
        console.log(votes);
    });

    setTimeout(async () => {

  
      const highestVote = Math.max(...votes);

      console.log(highestVote);
      console.log(candidates[votes.indexOf(highestVote)]);
  
      const embed = new Discord.MessageEmbed()
        .setTitle("RESULTS")
        .setColor("#EE3030")
        .addField("The Winner Is", candidates[votes.indexOf(highestVote)])
        .setFooter(`With a total of ${highestVote - 1} votes`);
  
      await bot.channels.cache.get(data.channelID).send(embed);
    }, 1000);

}


module.exports.help = {
  name:"end"
}
