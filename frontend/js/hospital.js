var urlparameter = window.location.href;
var url = new URL(urlparameter);
var c = url.searchParams.get("id");


var database;
$(document).ready(() => {
    $("#submitButton").click(function (event) {
        let data = {
            [c]: {
                id: "sample@email.com",
                name: "foo bar",
                rating: {
                    "Cultural Sensitivity": $("#c").html().match(/star active/g).length,
                    "Hospitality": $("#h").html().match(/star active/g).length,
                    "Quality of Care": $("#q").html().match(/star active/g).length
                },
                comment: $("#comment").val()
            }
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
    let address = hospital.address;
    let lat = hospital.lat;
    let long = hospital.long;
    let website = hospital.website
    let reviews = hospital.reviews;
    let id = c;
    if (!Array.isArray(reviews))
        reviews = Object.values(reviews);
    let rating = reviews[0].rating;
    let ratingView = '<div class="col-md-3"><font size="4">' + rating + '</font></div>';
    let cSens = rating["Cultural Sensitivity"];
    let idName = '<div><font size= "30">' + '-' + id + '</font></div>';
    let cSensRating = '<span class="rating" data-default-rating="' + cSens + '" disabled></span>';
    let comments = reviews[0].comment;
    let hosp = rating["Hospitality"];
    let hospRating = '<span class="rating" data-default-rating="' + hosp + '" disabled></span>';
    let average = '<span class="rating" data-default-rating="' + (hosp + cSens) / 2 + '" disabled></span>';
    let nameTitle = '<center><font size="175px" color = "#FF553D">' + name + '</font></center>';
    let qoc = rating["Quality of Care"]
    let QOC = '<span class="rating" data-default-rating="' + qoc + '" disabled></span>';
    let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5">' + id + '</a></font></center><div class="col-md-3"><font size="4">Distance: ' + lat + long + ' Miles</font></div>' + '<div class="col-md-12"><center><a href ="' + rating + '">' + website + '</a></center></div>' + '<font size="4"><div class="col-md-3">Overall: <br><span class="rating" data-default-rating="' + (hosp + cSens) / 2 + '" disabled></span></div><div class="col-md-3">Hospitality: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div><div class="col-md-3">Cultural Sensitivity: <br><span class="rating" data-default-rating="' + cSens + '" disabled></span></div><div class="col-md-3">Quality of Care: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div></font></div>';
    let comment = '<div><font size= "50">' + comments + '</font></div>';
    console.log(QOC);
    $("#qoc").html(QOC);
    $(comment).appendTo("#comment");
    $(element).appendTo("#summary");
    $(ratingView).appendTo("#review");
    $(nameTitle).appendTo("#nameTitle");
    $(cSensRating).appendTo("#cSen");
    $(hospRating).appendTo("#hosp");
    $(average).appendTo("#average");
    $(idName).appendTo("id");
    updateRatings();
}



updateRatings = () => {
    var ratings = document.getElementsByClassName('rating');

    for (var i = 0; i < ratings.length; i++) {
        var r = new SimpleStarRating(ratings[i]);

        ratings[i].addEventListener('rate', function (e) {
            ratings[i].value = e.details;
        });
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
