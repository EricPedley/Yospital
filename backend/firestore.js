const admin = require('firebase-admin');

//Secret key stored at ./secretkey.json
let serviceAccount = require('./secretkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin.firestore();
