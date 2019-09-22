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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("userDisplay").innerHTML = "Hello, " + user.email;
    }
    else {
        document.getElementById("userDisplay").innerHTML = "Not logged in";
    }
});


