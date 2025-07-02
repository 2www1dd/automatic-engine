const express = require('express');
const app = express();
app.use(express.json());

const VERIFICATION_TOKEN = 'your-secret-token-1234abcd'; // den gleichen Token wie beim eBay API-Aufruf

app.post('/webhook', (req, res) => {
  const body = req.body;

  // Bei der Registrierung schickt eBay ein Objekt mit "challenge"
  if (body.challenge && body.verificationToken === VERIFICATION_TOKEN) {
    console.log('🔐 Validierungsanfrage empfangen');

    // eBay erwartet, dass du "challenge" einfach zurückgibst
    res.status(200).send(body.challenge);
  } else {
    // Optional: Anfragen mit echten Daten nach Registrierung
    console.log('📩 Webhook-Daten:', body);
    res.status(200).send('OK');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server läuft auf Port ${port}`);
});
