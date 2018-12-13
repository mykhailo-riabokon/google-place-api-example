const functions = require('firebase-functions');
const apiKey = functions.config().google['api-key'];

exports.getKey = functions.https.onRequest((_, response) => {
  response.send({
    key: apiKey,
  });
});
