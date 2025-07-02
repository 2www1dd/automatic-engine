const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Dein Verification Token
const verificationToken = 'adsfakedjdjfsf1234abcdeuqegwu6e821he';

// Middleware zum Parsen des JSON-Body
app.use(bodyParser.json());

// Webhook-Route
app.post('/webhook', (req, res) => {
  const tokenFromHeader = req.headers['x-ebay-notification-token'];

  // Überprüfen, ob der Token stimmt
  if (tokenFromHeader !== verificationToken) {
    console.log('❌ Unautorisierte Anfrage!');
    return res.status(401).send('Unauthorized');
  }

  // Wenn der Token übereinstimmt, verarbeite die Benachrichtigung
  console.log("🔔 Webhook erhalten:", req.body);
  res.status(200).send('Webhook OK');
});

// Standard-Route
app.get('/', (req, res) => {
  res.send('Webhook-Server läuft!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
