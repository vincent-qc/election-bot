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

    let tied = false;

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
              if(!votedUsers.includes(u) || u != "860937161679568928") {
                returnedUserList.push(u);
                votedUsers.push(u);
              }
            });

            return returnedUserList;
        });
        await votes.push(reactions.length);
    });

    const formatTiedUsers = (users) => {
      let res = "";
      users.forEach(u => {
        //console.log(u);
        res += `${candidates[u]} `;
      });
    }

    setTimeout(async () => {
      
  
      const highestVote = votes[0];
      let tiedUsers = [];

      for(let i = 1; i < votes.length; i++) {

        if(votes[i] > highestVote) {
          console.log(votes[i])
          console.log(highestVote)

          highestVote = votes[i];
          tiedUsers = [];
          tiedUsers.push(i);
          tied = false;
        } else if(votes[i] == highestVote) {
          console.log("higest vote" + highestVote);
          tied = true;
          tiedUsers.push(i);
        }

        console.log(votes[i])
        console.log(highestVote)
        console.log("---------------");
      }

      const embed = new Discord.MessageEmbed();

      if(tied) {
          embed
          .setTitle("RESULTS")
          .setColor("#EE3030")
          .setImage("https://i.redd.it/dvj5rg226de41.jpg")
          .addField(`There was a tie between ${formatTiedUsers(tiedUsers)}`)
          .setFooter(`Both with a total of ${highestVote - 1} votes`);
      } else {
        embed
          .setTitle("RESULTS")
          .setColor("#EE3030")
          .setImage("https://i.redd.it/dvj5rg226de41.jpg")
          .addField("The Winner Is", candidates[votes.indexOf(highestVote)])
          .setFooter(`With a total of ${highestVote - 1} votes`);
      }
  
      await bot.channels.cache.get(data.channelID).send(embed);
    }, 1000);

}



module.exports.help = {
  name:"end"
}
