const express = require("express");
const app = express();

app.use(express.json());

let messages = [];

app.post("/send", (req, res) => {
  const { username, content } = req.body;

  if (!username || !content) {
    return res.status(400).send("Eksik veri");
  }

  messages.push({
    username,
    content,
    time: Date.now()
  });

  if (messages.length > 50) {
    messages.shift();
  }

  res.send("OK");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server çalışıyor");
});
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const DISCORD_TOKEN = "MTQ1OTA4NTU4NTA3ODgxMjcwMg.GyCv12._5tZUtKYbRBm20jYUWkXMSOnwMPsITkMgTBJXI";
const TARGET_CHANNEL_ID = "1459086392478142550";

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== TARGET_CHANNEL_ID) return;

  fetch("https://https://discord-roblox-chat.onrender.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: message.author.username,
      content: message.content
    })
  });
});

client.login(DISCORD_TOKEN);
