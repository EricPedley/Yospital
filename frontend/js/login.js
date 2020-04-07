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

function createAccount() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
            alert("Password should be longer than 6 characters.");
        } 
        else {
            console.log(errorMessage);
        }
    });
    
}

function signIn() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {window.location.href="landing.html"}).catch(function(error) {
        var errorMessage = error.message;
            alert(errorMessage);
    });
}


