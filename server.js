const express = require('express');
const app = express();
app.use(express.json());

const VERIFICATION_TOKEN = 'adsfakedjdjfsf1234abcdeuqegwu6e821he'; // gleich wie bei eBay API-Aufruf

app.post('/webhook', (req, res) => {
  const { verificationToken, challenge } = req.body;

  if (challenge && verificationToken === VERIFICATION_TOKEN) {
    console.log('🔐 Validierungsanfrage empfangen');
    // eBay erwartet die Challenge 1:1 als Text zurück
    res.status(200).send(challenge);
  } else {
    // Normale Webhook-Events hier verarbeiten
    console.log('📩 Webhook-Daten:', req.body);
    res.status(200).send('OK');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server läuft auf Port ${port}`);
});
