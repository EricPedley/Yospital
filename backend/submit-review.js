module.exports = (req, res) => {
    var admin = require("firebase-admin");

    var serviceAccount = require("serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://justcare.firebaseio.com"
    });
    const firestore = admin.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    let data = JSON.parse(req);
    let collectionKey="hospitals";
    if (data && (typeof data === "object")) {
        Object.keys(data).forEach(docKey => {
            firestore.collection(collectionKey).doc(docKey).field("reviews").append(data[docKey]).then((res) => {
                console.log("Document " + docKey + " successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        });
    }
}
