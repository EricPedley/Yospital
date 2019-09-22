

var urlparameter = window.location.href.substring(window.location.href.indexOf('?')+4);
console.log(urlparameter);
var database;
$(document).ready(() => {

    makeAPIPost(urlparameter, function (apidata) {
        console.log(apidata);
        console.log("starting foreach");
        loadData();
        $('#zip').html('');
        $('#botheader').html('<font size=6>Hospitals Near You:</font>');
        updateRatings();
    });

        
    });
    function makeAPIPost(x, callback) {
        $.post("http://localhost:3000/hospital-info", JSON.stringify({ id: x }), function (data) {
            console.log(data);
            database = JSON.parse(data);
            callback(database);
        });
    }
function loadData() {

    let hospital = database;
    let name = hospital.name;
    let address = hospital.address;
  let lat = hospital.lat;
  let long = hospital.long;
  let website = hospital.website
  let id = hospital.reviews["id"];
  let rating = hospital.reviews[0].rating;
  let ratingView = '<div class="col-md-3"><font size="4">' + rating + '</font></div>'
  let cSens = rating["Cultural Sensitivity"];
  
  let cSensRating = '<span class="rating" data-default-rating="' + cSens + '" disabled></span>';
  let comments = rating["comment"]
  let hosp = rating["Hospitality"];
  let hospRating = '<span class="rating" data-default-rating="' + hosp + '" disabled></span>';
  let average = '<span class="rating" data-default-rating="' + (hosp + cSens) / 2 + '" disabled></span>';
  let nameTitle = '<center><font size="175px" color = "#FF553D">'+ name + '</font></center>';
  let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5">' + id + '</a></font></center><div class="col-md-3"><font size="4">Distance: ' + lat + long + ' Miles</font></div>' + '<div class="col-md-12"><center><a href ="' + rating + '">' + website + '</a></center></div>' + '<font size="4"><div class="col-md-3">Overall: <br><span class="rating" data-default-rating="' + (hosp + cSens) / 2 + '" disabled></span></div><div class="col-md-3">Hospitality: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div><div class="col-md-3">Cultural Sensitivity: <br><span class="rating" data-default-rating="' + cSens + '" disabled></span></div><div class="col-md-3">Quality of Care: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div></font></div>';
    let comment = '<div class="col-md-12"><font size= "50">' + comments + '</font></div>';
  console.log(nameTitle);
  console.log(hospRating);
  console.log(cSensRating);
  $(comment).appendTo("#comment");
  $(element).appendTo("#summary");
  $(ratingView).appendTo("#review");
  $(nameTitle).appendTo("#nameTitle");
  $(cSensRating).appendTo("#cSen");
  $(hospRating).appendTo("#hosp");
  $(average).appendTo("#average");
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
                console.log('Rating: ' + e.detail);
            });
        }
};