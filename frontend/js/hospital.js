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
var email;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        email=user.email;
    }
    else {
        console.log('not logged in');
    }
});

var urlparameter = window.location.href;
var url = new URL(urlparameter);
var c = url.searchParams.get("id");


var database;
$(document).ready(() => {
    $("#submitButton").click(function(event) {
        let data = {
            [c]:{
                id:email,
                name:"foo bar",
                rating: {
                    "Cultural Sensitivity":$("#c").html().match(/star active/g).length,
                    "Hospitality":$("#h").html().match(/star active/g).length,
                    "Quality of Care":$("#q").html().match(/star active/g).length
                },
                comments:$("#comment").val()
            }
        }
        console.log(data);
        //console.log($("#c").html().match(/star active/g).length);//.substring(document.getElementById("c").innerHTML.indexOf("data-rating")));
    });
    makeAPIPost(c, function (apidata) {
        console.log(apidata);
        console.log("starting foreach");
        loadData();
        $('#zip').html('');
        $('#botheader').html('<font size=6>Hospitals Near You:</font>');
        //updateRatings();
    });

        
    });
    function makeAPIPost(x, callback) {
        $.post("https://justcare.ruizalex.com/hospital-info", JSON.stringify({ id: x }), function (data) {
            console.log(data);
            database = JSON.parse(data);
            callback(database);
        });
    }
function loadData() {

    let hospital = database[c];
    let name = hospital.name;
    let address = hospital.address;
  let lat = hospital.lat;
  let long = hospital.long;
  let website = hospital.website
  let id = hospital.reviews[0].name;
  let rating = hospital.reviews[0].rating;
  let ratingView = '<div class="col-md-3"><font size="4">' + rating + '</font></div>';
  let cSens = rating["Cultural Sensitivity"];
  let idName = '<div><font size= "30">' + '-' + id + '</font></div>';
  let cSensRating = '<span class="rating" data-default-rating="' + cSens + '" disabled></span>';
  let comments = hospital.reviews[0].comment;
  let hosp = rating["Hospitality"];
  let hospRating = '<span class="rating" data-default-rating="' + hosp + '" disabled></span>';
  let average = '<span class="rating" data-default-rating="' + (hosp + cSens) / 2 + '" disabled></span>';
  let nameTitle = '<center><font size="175px" color = "#FF553D">'+ name + '</font></center>';
  let qoc = rating["Quality of Care"]
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
  $(nameTitle).appendTo("#nameTitle");
  $(cSensRating).appendTo("#cSen");
  $(hospRating).appendTo("#hosp");
  $(average).appendTo("#average");
  $(idName).appendTo("id");
}
        // let hospital = database;
        // let id = hospital.id;
        // let name = hospital.name;
        // let nameTitle = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5">'+name+'</font></center>';
        // let address=hospital.address;
        // let proximity = hospital.proximity;
        // let rating = hospital.rating;
        // let cSens = rating["Cultural Sensitivity"];
        // let cSensRating = '<span class="rating" data-default-rating="'+cSens+'" disabled></span></div></font></div>';
        // let hosp = rating["Hospitality"];
        // let hospRating = '<div class="col-md-4">Hospitality: <span class="rating" data-default-rating="'+hosp+'" disabled></span></div>';
        // let average = '<span class="rating" data-default-rating="'+(hosp+cSens)/2+'" disabled></span>';
        // let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5">'+name+'</font></center><div class="col-md-3"><font size="4">Distance: '+proximity+' Miles</font></div><font size="4"><div class="col-md-4">Overall: <span class="rating" data-default-rating="'+(hosp+cSens)/2+'" disabled></span></div><div class="col-md-4">Hospitality: <span class="rating" data-default-rating="'+hosp+'" disabled></span></div><div class="col-md-4">Cultural Sensitivity: <span class="rating" data-default-rating="'+cSens+'" disabled></span></div></font></div>';
        // $(element).appendTo("#summaries");
        // $(average).appendTo("#average");
        // $(cSensRating).appendTo("#cSens");
        // $(hospRating).appendTo("#hosp");
        // $(nameTitle).appendTo('#name');
    

// $(document).ready(() => {
//     let input = '<input type = text id="zipinput"></input>';
//     $("#zipinputdiv").html(input);
//     $("#zipinput").keypress(function (event) {
//         if (event.keyCode === 13) {//enter key
//             let zipcode = $('#zipinput').val();
//             if (zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {//if input is a 5 digit number(zip code format)
//                 let apidata = makeAPIRequest(zipcode, 20);
//                 console.log(apidata);
//                 apidata.forEach((hospital,index) => {
//                     let id = hospital.id;
//                     let name = hospital.name;
//                     let nameTitle = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5">'+name+'</font></center>';
//                     let address=hospital.address;
//                     let proximity = hospital.proximity;
//                     let rating = hospital.rating;
//                     let cSens = rating["Cultural Sensitivity"];
//                     let cSensRating = '<span class="rating" data-default-rating="'+cSens+'" disabled></span></div></font></div>';
//                     let hosp = rating["Hospitality"];
//                     let hospRating = '<div class="col-md-4">Hospitality: <span class="rating" data-default-rating="'+hosp+'" disabled></span></div>';
//                     let average = '<span class="rating" data-default-rating="'+(hosp+cSens)/2+'" disabled></span>';
//                     let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5">'+name+'</font></center><div class="col-md-3"><font size="4">Distance: '+proximity+' Miles</font></div><font size="4"><div class="col-md-4">Overall: <span class="rating" data-default-rating="'+(hosp+cSens)/2+'" disabled></span></div><div class="col-md-4">Hospitality: <span class="rating" data-default-rating="'+hosp+'" disabled></span></div><div class="col-md-4">Cultural Sensitivity: <span class="rating" data-default-rating="'+cSens+'" disabled></span></div></font></div>';
//                     $(element).appendTo("#summaries");
//                     $(average).appendTo("#average");
//                     $(cSensRating).appendTo("#cSens");
//                     $(hospRating).appendTo("#hosp");
//                     $(nameTitle).appendTo('#name');
                    
                    
//                 });
//                 $('#zip').html('');
//                 $('#botheader').html('<font size=6>Hospitals Near You:</font>');
//                 updateRatings();
//             } else {
//                 alert("Please enter a zip code");
//                 //$('<center id = "ziperror">Please enter a zip code</center>').appendTo('#zipinputdiv');
//             }
//         }
//     });
// });



updateRatings = ()=>{
    var ratings = document.getElementsByClassName('rating');

        for (var i = 0; i < ratings.length; i++) {
            var r = new SimpleStarRating(ratings[i]);

            ratings[i].addEventListener('rate', function (e) {
                ratings[i].value=e.details;
            });
        }
};

function postReview(hospitalID, review) {
    $.post(
        "http://localhost:3000/submit-review",
        JSON.stringify({
            hospitalID: review
        }), function (data) {
            console.log("response:" + data);
        }
    );
}