var firebaseConfig = {
    apiKey: "AIzaSyD3c9raAeUHaUKQ9AgMSocycl5Kb3FEIxg",
    authDomain: "justcare.firebaseapp.com",
    databaseURL: "https://justcare.firebaseio.com",
    projectId: "justcare",
    storageBucket: "justcare.appspot.com",
    messagingSenderId: "482000803486",
    appId: "1:482000803486:web:6cd146b3233f53fdd04d8f"
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
            alert(errorMessage);
        }
    });
    $('.alert').show();
    document.getElementById("signInForm").reset();
}

function signIn() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {window.location.href="landing.html"}).catch(function(error) {
        var errorMessage = error.message;
            alert(errorMessage);
    });
}


