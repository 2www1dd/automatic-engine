const express = require('express');
const app = express();
app.use(express.json());

// Dein Verification Token von eBay
const verificationToken = 'adsfakedjdjfsf1234abcdeuqegwu6e821he';

app.post('/webhook', (req, res) => {
  // Überprüfen, ob der Token in den Headern der Anfrage vorhanden ist
  const tokenFromHeader = req.headers['x-ebay-notification-token'];

  // Überprüfen, ob der Token übereinstimmt
  if (tokenFromHeader !== verificationToken) {
    console.log('❌ Unauthorisierte Anfrage!');
    return res.status(401).send('Unauthorized');
  }

  // Wenn der Token übereinstimmt, verarbeite die Anfrage
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
