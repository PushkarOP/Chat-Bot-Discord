const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
}); // These 3 intents are REQUIRED for this example to function.

const config = {
  api_token: process.env['YOUR_API_TOKEN_HERE'], // Replace this with your API token.
  bot_token: process.env['YOUR_BOT_TOKEN_HERE'], // Replace this with your bot token.
};
const smartestchatbot = require("smartestchatbot");
const scb = new smartestchatbot.Client(config.api_token);

client.login(config.bot_token);

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );
  client.user.setActivity(`Playing MagicGames`);
});

const keepAlive = require('./server.js')
keepAlive()

client.on("messageCreate", (message) => {
  if (message.channel.name == "ᕙ╭𒋝☁₊ﾟchatbot") {
    // The bot will only look for messages with the channel named "chatbot"
    if (message.author.bot) return;
    message.content = message.content
      .replace(/@(everyone)/gi, "everyone")
      .replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.reply({
        content: "**:x: Please dont mention anyone**",
        allowedMentions: { repliedUser: true },
      });
    }
    message.channel.sendTyping();
    if (!message.content)
      return message.reply({
        content: "Please say something.",
        allowedMentions: { repliedUser: true },
      });

    scb
      .chat(
        {
          message: message.content,
          name: client.user.username,
          master: "PushkarOP",
          user: message.author.id,
        },
        "en"
      )
      .then((reply) => {
        if (!reply) return console.log('[ERROR]: No reply');
        message.reply({
          content: reply,
          allowedMentions: { repliedUser: true },
        });
      });

    message.channel.sendTyping();
  }
});
