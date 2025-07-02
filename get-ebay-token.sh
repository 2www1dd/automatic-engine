#!/bin/bash

# === Trage hier deine echten eBay App-Schlüssel ein ===
CLIENT_ID="DEIN_CLIENT_ID"
CLIENT_SECRET="DEIN_CLIENT_SECRET"

# === Dieser Scope ist für Webhook-Registrierung erforderlich ===
SCOPE="https://api.ebay.com/oauth/api_scope/commerce.notification.readwrite"

# === Access Token holen ===
echo "🔐 Fordere eBay Access Token an..."

RESPONSE=$(curl -s -X POST https://api.ebay.com/identity/v1/oauth2/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&scope=$SCOPE")

# === Token extrahieren ===
ACCESS_TOKEN=$(echo "$RESPONSE" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -n "$ACCESS_TOKEN" ]; then
  echo "✅ Access Token:"
  echo "$ACCESS_TOKEN"
else
  echo "❌ Fehler beim Abrufen des Tokens:"
  echo "$RESPONSE"
fi
