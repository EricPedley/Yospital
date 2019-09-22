var database;
var counter;
var firstTen = [];
$(document).ready(() => {
    counter = 0;
    $(window).bind('scroll', function () {
        if ($("#map").html() === '' && $(window).scrollTop() >= $('#bottom').offset().top + $('#bottom').outerHeight() - window.innerHeight) {
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
                    loadData(true);
                    $('#zip').html('');
                    //addMap(zipcode);
                    //$('#map').html('<center><div class="mapouter"><div class="gmap_canvas"><iframe width="590" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q='+zipcode+'&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.embedgooglemap.net/blog/best-wordpress-themes/"></a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:590px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:590px;}</style></div></center>');
                    //$('#map').html('<div class="mapouter"><div class="gmap_canvas"><iframe width="590" height="500" id="gmap_canvas" src="https://www.google.com/maps/search/hospitals/@37.7734358,-122.4400006,13.35z" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.embedgooglemap.net/blog/best-wordpress-themes/"></a></div><style>.mapouter{position:relative;text-align:right;height:500px;width:590px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:590px;}</style></div>');
                    $('#botheader').html('<font size=6>Hospitals Near You:</font>');
                    
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

function initMap() { }
var map;
function loadData(first) {
    let ids = [];
    let dists = [];
    let lats = [];
    for (let i = 0; i < 10; i++) {
        let hospital = database[counter];
        dists.push(hospital.proximity);
        console.log(hospital);
        if (first) {
            let pos = {
                lat: hospital.lat,
                lng: hospital.long
            };
            if (i === 0) {
                map = new google.maps.Map(
                    document.getElementById('map'), { zoom: 13, center: pos });
            }
            let offsetY = 0;
            lats.forEach((otherLat) => {
                if (Math.abs(hospital.lat - otherLat) < 0.001) {
                    offsetY = -20;
                    console.log("offset tiem");
                }
            });
            lats.push(hospital.lat);
            var markerIcon = {
                url: 'images/marker.png',
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40),
                labelOrigin: new google.maps.Point(90, offsetY)
            };

            let marker = new google.maps.Marker({
                position: pos,
                animation: google.maps.Animation.DROP,
                icon: markerIcon,
                label: {
                    text: hospital.name,
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                map: map
            })
        }
        let id = hospital.id;
        ids.push(id);
        counter++;
    }
    $.post("http://localhost:3000/hospital-info", JSON.stringify(ids), function (data) {
        console.log(data);
        JSON.parse(data).forEach((hospital,index) => {
            let name = hospital.name;
            let proximity = dists[index];
            let address = hospital.address;
            let reviews = hospital.reviews;
            let cSens=0,hosp=0,qcare=0;
            let total=0;
            reviews.forEach(review => {
                let rating=review.rating;
                cSens += rating["Cultural Sensitivity"];
                hosp += rating["Hospitality"];
                qcare += rating["Quality of Care"];
                total++;
            });
            cSens/=total;
            hosp/=total;
            qcare/=total;
            console.log(cSens+"|"+hosp);
            let id =hospital.id;
            let gmaps = "https://www.google.com/maps/place/" + address.replace(/\s/g, "+");
            let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5"><a href="hospitalTemplate.html?id=' + id + '">' + name + '</a></font></center><div class="col-md-3"><font size="4">Distance: ' + Math.round(proximity * 10) / 10 + ' Miles</font></div>' + '<div class="col-md-12"><center><a href ="' + gmaps + '">' + address + '</a></center></div>' + '<font size="4"><div class="col-md-3">Overall: <br><span class="rating" data-default-rating="' + (hosp + cSens) / 2 + '" disabled></span></div><div class="col-md-3">Hospitality: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div><div class="col-md-3">Cultural Sensitivity: <br><span class="rating" data-default-rating="' + cSens + '" disabled></span></div><div class="col-md-3">Quality of Care: <br><span class="rating" data-default-rating="' + qcare + '" disabled></span></div></font></div>';
            $(element).appendTo("#summaries");
        });
        updateRatings();
    });
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