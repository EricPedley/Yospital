var firebaseConfig = {
  apiKey: "AIzaSyC1BCYOage1fSiIRVXN8TfvaSLEg8JKWVg",
  authDomain: "justcare-1569097818908.firebaseapp.com",
  databaseURL: "https://justcare-1569097818908.firebaseio.com",
  projectId: "justcare-1569097818908",
  storageBucket: "justcare-1569097818908.appspot.com",
  messagingSenderId: "402416346671",
  appId: "1:402416346671:web:cd922f242c03429dca08da",
  measurementId: "G-T7K2J4G22X"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
    
    if (user) {
        document.getElementById("userDisplay").innerHTML = "Hello, " + user.email + ". " + "<a onClick='signOut()'> Sign out?</a>";
    }
    else {
        document.getElementById("userDisplay").innerHTML = "Not logged in";
    }
});

function signOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });      
}


