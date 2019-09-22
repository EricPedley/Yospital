module.exports = (req, res) => {
    var admin = require("firebase-admin");

    var serviceAccount = require("./secretkey.json");
    console.log("doing stuff");
    const firestore = admin.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    let data = req.body;
    let collectionKey="hospitals";
    if (data && (typeof data === "object")) {
        Object.keys(data).forEach(docKey => {
            firestore.collection(collectionKey).doc(docKey).set({"reviews":data},{merge:true}).then((res) => {
                console.log("Document " + docKey + " successfully written!");

            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        });
    }
}
