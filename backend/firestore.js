const admin = require('firebase-admin');

//Secret key stored at ./secretkey.json
let serviceAccount = require('./secretkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const settings = { timestampsInSnapshots: true };

const firestore = admin.firestore();
firestore.settings(settings);

module.exports = firestore;
