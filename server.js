const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log("🔔 Webhook erhalten:", req.body);
  res.status(200).send('Webhook OK');
});

app.get('/', (req, res) => {
  res.send('Webhook-Server läuft!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
