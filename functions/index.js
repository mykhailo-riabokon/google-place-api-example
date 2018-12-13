const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const apiKey = functions.config().google['api-key'];

exports.getKey = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.send({
      key: apiKey,
    });
  });
});
