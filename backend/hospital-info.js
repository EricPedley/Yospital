const admin = require('firebase-admin');

//Secret key stored at ./secretkey.json
let serviceAccount = require('./secretkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

module.exports = (req, res) => {
  var data = req.body;
  if (!data.id && !data.ids)
    res.status(400).send("Must send one or more hospital IDs.");
  if (data.id)
    db.collection('hospitals').doc(data.id).get()
      .then(doc => {
        if (!doc.exists) {
          res.status(400).send(`Document with ID ${data.id} doesn't exist.`);
        } else {
          res.send(JSON.stringify({[data.id]: doc.data()}));
        }
      });
  else if (data.ids) {
    const refs = data.ids.map(x => db.collection('hospitals').doc(x));
    let updateFunction = async t => {
      const promises = await Promise.all(refs.map(x=>t.get(x)));
      return Object.assign(...data.ids.map((k,i) => ({[k]: promises[i].data()})))
    };
    let transaction = db.runTransaction(updateFunction)
      .then(result => {
        res.send(JSON.stringify(result));
      })
      .catch(err => {
        res.status(500).send("Failure getting records from firebase: "+err);
      });
  }
};
