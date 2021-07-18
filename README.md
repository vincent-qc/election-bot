# Election Bot to Bring Democracy to your Discord Servers

**DISCLAIMER** - I am not responsible for any stroke trying to read this code. I myself can't even decrypt what I wrote (as I was high on caffine yesterday night), so gl trying to so yourself.

## Setup

- Install `Node.js` and `Discord.js`
- Setup Discord Bot and Change Token in `token.json`
- `cd` to this dirctory and run `node app.js`

### How to Use

*prefix e!*

Regular Commands
- **ping** - Pings the bot
- **help** - Displays help menu

Election Commands
- **Start** `start <channel-id> <user-1> <user-2> <user-3>... <election-id> <allow-multiple-votes>` - Start an election in \<channel-id> with ...\<users> and sets its ID to \<election-id>. \<allow-multiple-votes> must be of type boolean
- **End** `end <election-id>` - Ends the election with \<election-id>

Annoucement Commands
- **Annouce** `annouce <channel-id> <text...>` - Sends <...text> into \<channel-id>
- **Alert** `alert <text...>` - DM every user in the server with <...text>
- **Remind** `remind <channel-id> <text...>` - Same as `annouce` but pings `@everyone` 

## Authors

- [**Crabo-7498**](https://github.com/Crabo-7498) - Author

## Built With

- [Node.js](https://nodejs.org/en/) - the base that the bot runs on
- [discord.js](https://discord.js.org/#/) - node.js link to the discord bot api
- [CappeDiem](https://github.com/CappeDiem) - The base Discord Bot's template
