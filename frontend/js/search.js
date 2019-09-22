var database;
var counter = 0;
$(document).ready(() => {
    $(window).bind('scroll', function () {
        if ($(window).scrollTop() >= $('#bottom').offset().top + $('#bottom').outerHeight() - window.innerHeight) {
            loadData();
            updateRatings();
        }
    });
    let input = '<input type = text id="zipinput"></input>';
    $("#zipinputdiv").html(input);
    $("#zipinput").keypress(function (event) {
        if (event.keyCode === 13) {//enter key
            let zipcode = $('#zipinput').val();
            if (zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {//if input is a 5 digit number(zip code format)
                makeAPIPost(zipcode, function (apidata) {
                    console.log(apidata);
                    console.log("starting foreach");
                    loadData();
                    $('#zip').html('');
                    
                    $('#map').html('<center><div class="mapouter"><div class="gmap_canvas"><iframe width="590" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q='+zipcode+'&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.embedgooglemap.net/blog/best-wordpress-themes/"></a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:590px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:590px;}</style></div></center>');
                    //$('#map').html('<div class="mapouter"><div class="gmap_canvas"><iframe width="590" height="500" id="gmap_canvas" src="https://www.google.com/maps/search/hospitals/@37.7734358,-122.4400006,13.35z" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.embedgooglemap.net/blog/best-wordpress-themes/"></a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:590px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:590px;}</style></div>');
                    $('#botheader').html('<font size=6>Hospitals Near You:</font>');
                    updateRatings();
                });
            } else {
                alert("Please enter a zip code");
            }
        }
    });
});

function makeAPIPost(zipcode, callback) {
    $.post("http://localhost:3000/hospital-list", JSON.stringify({ zip: zipcode }), function (data) {
        console.log(data);
        database = JSON.parse(data);
        callback(database);
    });
}

function loadData() {
    for (let i = 0; i < 10; i++) {
        let hospital = database[counter];
        let id = hospital.id;
        let name = hospital.name;
        let address = hospital.address;
        let proximity = hospital.proximity;
        let rating = hospital.rating;
        let cSens = rating["Cultural Sensitivity"];
        let hosp = rating["Hospitality"];
        let qcare = rating["Quality of Care"];
        if(i===0)
            console.log(address.replace(/\s/g,"+"));
        let gmaps = "https://www.google.com/maps/place/"+address.replace(/\s/g,"+");
        let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5"><a href="hospitalTemplate.html?id='+id+'">' + name + '</a></font></center><div class="col-md-3"><font size="4">Distance: ' + Math.round(proximity*10)/10 + ' Miles</font></div>'+'<div class="col-md-12"><center><a href ="'+gmaps+'">'+address+'</a></center></div>'+'<font size="4"><div class="col-md-3">Overall: <br><span class="rating" data-default-rating="' + (hosp + cSens) / 2 + '" disabled></span></div><div class="col-md-3">Hospitality: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div><div class="col-md-3">Cultural Sensitivity: <br><span class="rating" data-default-rating="' + cSens + '" disabled></span></div><div class="col-md-3">Quality of Care: <br><span class="rating" data-default-rating="' + qcare + '" disabled></span></div></font></div>';
        $(element).appendTo("#summaries");
        counter++;
    }
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