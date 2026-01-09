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
