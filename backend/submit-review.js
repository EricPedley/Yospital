const firestore = require('./firestore')

module.exports = (req, res) => {
    let data = req.body;
    let collectionKey="hospitals";
    if (data && (typeof data === "object")) {
        Object.keys(data).forEach(docKey => {
            firestore.collection(collectionKey).doc(docKey).get()
              .then(doc => {
                if (!doc.exists) {
                  res.status(400).send(`No such document "${docKey}"`);
                }

                let rev = doc.data().reviews;

                if (Array.isArray(rev)) {
                  rev.push(data[docKey]);

                  firestore.collection(collectionKey).doc(docKey)
                    .update({reviews: rev})
                    .then((res1) => {
                        res.send(`Document ${docKey} successfully written!`);
                    }).catch((error) => {
                        res.status(500).send("Error writing document: " + error);
                        console.error("Error writing document: ", error);
                    });
                }
                else {
                  let newRev = [rev[docKey], data[docKey]];

                  firestore.collection(collectionKey).doc(docKey)
                    .update({reviews: rev})
                    .then((res1) => {
                        res.send(`Document ${docKey} successfully written!`);
                    }).catch((error) => {
                        res.status(500).send("Error writing document: " + error);
                        console.error("Error writing document: ", error);
                    });
                }
              });
        });
    }
}
