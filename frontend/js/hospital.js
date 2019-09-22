var urlparameter = window.location.href;
var url = new URL(urlparameter);
var c = url.searchParams.get("id");

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

var currentUser;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      currentUser = user;
    }
});


var database;
$(document).ready(() => {
    $("#submitButton").click(function (event) {
        let data = {
            [c]: {
                id: "anon@noone.com",
                name: "Anonymous",
                rating: {
                    "Cultural Sensitivity": $("#c").html().match(/star active/g).length,
                    "Hospitality": $("#h").html().match(/star active/g).length,
                    "Quality of Care": $("#q").html().match(/star active/g).length
                },
                comment: $("input#comment").val()
            }
        }
        if (currentUser) {
          data[c].id = currentUser.email;
        }
        postReview(data);

        //console.log($("#c").html().match(/star active/g).length);//.substring(document.getElementById("c").innerHTML.indexOf("data-rating")));
    });
    makeAPIPost(c, function (apidata) {
        loadData();
    });


});
function makeAPIPost(x, callback) {
    $.post("https://justcare.ruizalex.com/hospital-info", JSON.stringify({ id: x }), function (data) {

        database = JSON.parse(data);
        callback(database);
    });
}
function loadData() {

    let hospital = database[c];
    let name = hospital.name;
    let nameTitle = '<center><font size="175px" color = "#FF553D">' + name + '</font></center>';
    $(nameTitle).appendTo("#nameTitle");
    let address = hospital.address;
    let lat = hospital.lat;
    let long = hospital.long;
    let website = hospital.website
    let reviews = hospital.reviews;
    let id = c;
    if (!Array.isArray(reviews))
      reviews = Object.values(reviews);
    let rating = reviews[0] ? reviews[0].rating : undefined;
    let ratingView = '<div class="col-md-3"><font size="4">' + rating + '</font></div>';
    let csname = "Cultural Sensitivity";
    let hospname = "Hospitality";
    let qocname = "Quality of Care";
    let cSens = rating ?
      reviews.reduce((a,c)=>a+parseInt(c.rating[csname]), 0)/reviews.length : 0;
    let idName = '<div><font size= "30">' + '-' + id + '</font></div>';
    let cSensRating = '<span class="rating" data-default-rating="' + cSens + '" disabled></span>';
    let comments = rating ? `"${reviews[reviews.length-1].comment}" -${reviews[reviews.length-1].id}` : "No one has rated this hospital yet";
    let hosp = rating ?
      reviews.reduce((a,c)=>a+parseInt(c.rating[hospname]), 0)/reviews.length : 0;
    let qoc = rating ?
      reviews.reduce((a,c)=>a+parseInt(c.rating[qocname]), 0)/reviews.length : 0;
    let hospRating = '<span class="rating" data-default-rating="' + hosp + '" disabled></span>';
    let average = '<span class="rating" data-default-rating="' + (hosp + cSens + qoc) / 3 + '" disabled></span>';
    let QOC = '<span class="rating" data-default-rating="' + qoc + '" disabled></span>';
    let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5">' + id + '</a></font></center><div class="col-md-3"><font size="4">Distance: ' + lat + long + ' Miles</font></div>' + '<div class="col-md-12"><center><a href ="' + rating + '">' + website + '</a></center></div>' + '<font size="4"><div class="col-md-3">Overall: <br><span class="rating" data-default-rating="' + (hosp + cSens) / 2 + '" disabled></span></div><div class="col-md-3">Hospitality: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div><div class="col-md-3">Cultural Sensitivity: <br><span class="rating" data-default-rating="' + cSens + '" disabled></span></div><div class="col-md-3">Quality of Care: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div></font></div>';
    let comment = '<div><font size= "50">' + comments + '</font></div>';
    console.log(nameTitle);
    console.log(hospRating);
    console.log(cSensRating);
    console.log(comment);
    console.log(id);
    console.log(idName);
    $(QOC).appendTo("#qoc");
    $(comment).appendTo("#comment");
    $(element).appendTo("#summary");
    $(ratingView).appendTo("#review");
    // $(nameTitle).appendTo("#nameTitle");
    $(cSensRating).appendTo("#cSen");
    $(hospRating).appendTo("#hosp");
    $(average).appendTo("#average");
    $(idName).appendTo("id");
    updateRatings();
}
updateRatings = () => {
    var ratings = document.getElementsByClassName('rating');
    for (var i = 0; i < ratings.length; i++) {
        if (!ratings[i].style[0]) {
            var r = new SimpleStarRating(ratings[i]);

            ratings[i].addEventListener('rate', function (e) {
                console.log('Rating: ' + e.detail);
            });
        }
    }
};

function postReview(review) {
    $.post(
        "https://justcare.ruizalex.com/submit-review",
        JSON.stringify(review), function (data) {
            console.log("response:" + data);
        }
    );
    alert("Review Posted");
}
