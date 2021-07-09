const admin = require('firebase-admin');

//Secret key stored at ./secretkey.json
let secretKey;
try {
  secretKey = require('./secretkey.json')
}
catch(error) {
  let encodedKey=process.env.SECRET_KEY_ENCODED;
  if(!encodedKey) {
    require("dotenv").config()
    encodedKey=process.env.SECRET_KEY_ENCODED
  }
  secretKey=JSON.parse(Buffer.from(encodedKey,"base64").toString("ascii"))
}
const serviceAccount = secretKey;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const settings = { timestampsInSnapshots: true };

const firestore = admin.firestore();
firestore.settings(settings);

module.exports = firestore;
