const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const apiKey = functions.config().google['api-key'];
const app = express();

// Allow origins, which is only good for demo
app.use(cors({ origin: true }));
app.get('/', (_, res) => {
  res.send({ key: apiKey });
});

exports.getKey = functions.https.onRequest(app);
