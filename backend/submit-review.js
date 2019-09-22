const firestore = require('./firestore')

module.exports = (req, res) => {
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
