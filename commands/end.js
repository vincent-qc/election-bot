const Discord = require("discord.js");
fs = require('fs');

const allowedOperators = ["586024151932731393", "585653754888716290"];

module.exports.run = async (bot, message, args) => {
    if(!allowedOperators.includes(message.author.id)) return message.channel.send("You do not have the perms to operate this bot. If you believe this is a mistake, contact `Crabo_#7498`");

    const data = JSON.parse(fs.readFileSync(`./data-${args[0]}.json`, 'utf8' , (err, data) => {
        if (err) {
          message.channel.send("```\n" + err + "\n```");
          return;
        }
    }));

    let tied = false;

    const indexToEmoji = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

    const votedUsers = ["860937161679568928"];

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
        console.log(reactions.length);
        await votes.push(reactions.length);
    });


    const formatTiedUsers = (users) => {
      let res = "";
      users.forEach(u => {
        res += `${candidates[u]}   `;
      });

      return res;
    }

    setTimeout(async () => {
      
  
      let highestVote = votes[0];
      let tiedUsers = [0];

      for(let i = 1; i < votes.length; i++) {

        if(votes[i] > highestVote) {

          highestVote = votes[i];
          tiedUsers = [];
          tiedUsers.push(i);
          tied = false;
        } else if(votes[i] == highestVote) {

          tied = true;
          tiedUsers.push(i);
        }
      }

      const embed = new Discord.MessageEmbed();

      if(tied) {
          embed
          .setTitle("RESULTS")
          .setColor("#EE3030")
          .setImage("https://cdn.discordapp.com/attachments/641299933164732417/861684454867206155/Untitled-1.png")
          .addField("Tie!", `There was a tie between ${formatTiedUsers(tiedUsers)}`, true)
          .setFooter(`Both with a total of ${highestVote} votes`);
      } else {
        embed
          .setTitle("RESULTS")
          .setColor("#EE3030")
          .setImage("https://i.redd.it/dvj5rg226de41.jpg")
          .addField("The Winner Is", candidates[votes.indexOf(highestVote)])
          .setFooter(`With a total of ${highestVote} votes`);
      }
  
      await bot.channels.cache.get(data.channelID).send(embed);

      try {
        fs.unlinkSync(`./data-${args[0]}.json`);

      } catch(err) {
          
      }
    }, 1000);

}



module.exports.help = {
  name:"end"
}
