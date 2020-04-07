var database;
var counter;
var firstTen = [];
$(document).ready(() => {
    console.log("this part is running");
    counter = 0;
    $(window).bind('scroll', function () {
        if ($("#map").html() !== '' && $(window).scrollTop() >= $('#bottom').offset().top + $('#bottom').outerHeight() - window.innerHeight) {
            loadData(false);
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
                    //console.log(apidata);
                    console.log("starting foreach");
                    loadData(true);
                    $('#zip').html('');
                    $('#botheader').html('<font size=6>Hospitals Near You:</font>');

                });
            } else {
                alert("Please enter a zip code");
            }
        }
    });
});

function makeAPIPost(zipcode, callback) {
    let w = window.location.href;
    $.post(w.substring(0, w.indexOf("/", w.indexOf("//"))) + "hospital-list", JSON.stringify({ zip: zipcode }), function (data) {
        console.log(data);
        database = JSON.parse(data);
        callback(database);
    });
}
function loadData(first) {
    var map;
    let ids = [];
    let dists = [];
    let lats = [];
    for (let i = 0; i < 10; i++) {
        let hospital = database[counter];
        console.log(hospital);
        first = false;
        // if (first) {
        //     try {
        //         let pos = {
        //             lat: hospital.lat,
        //             lng: hospital.long
        //         };
        //         if (i === 0) {
        //             map = new google.maps.Map(
        //                 document.getElementById('map'), { zoom: 13, center: pos });
        //         }
        //         let offsetY = 0;
        //         lats.forEach((otherLat) => {
        //             if (Math.abs(hospital.lat - otherLat) < 0.001) {
        //                 offsetY = -20;
        //                 console.log("offset tiem");
        //             }
        //         });
        //         lats.push(hospital.lat);
        //         var markerIcon = {
        //             url: 'images/marker.png',
        //             scaledSize: new google.maps.Size(40, 40),
        //             origin: new google.maps.Point(0, 0),
        //             anchor: new google.maps.Point(20, 40),
        //             labelOrigin: new google.maps.Point(90, offsetY)
        //         };

        //         let marker = new google.maps.Marker({
        //             position: pos,
        //             animation: google.maps.Animation.DROP,
        //             icon: markerIcon,
        //             label: {
        //                 text: hospital.name,
        //                 fontSize: '12px',
        //                 fontWeight: 'bold'
        //             },
        //             map: map
        //         })
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        // let id = hospital.id;
        // ids.push(id);
        let name = hospital.name;
        let proximity = hospital.proximity;
        let address = hospital.address;
        let reviews = hospital.reviews;
        let cSens = 0, hosp = 0, qcare = 0;
        let total = 0;
        if (reviews) {
            if (Array.isArray(reviews))
                reviews.forEach(review => {
                    let rating = review.rating;
                    cSens += rating["Cultural Sensitivity"];
                    hosp += rating["Hospitality"];
                    qcare += rating["Quality of Care"];
                    total++;
                })
            else {
                Object.values(reviews).forEach(review => {
                    let rating = review.rating;
                    cSens += rating["Cultural Sensitivity"];
                    hosp += rating["Hospitality"];
                    qcare += rating["Quality of Care"];
                    total++;
                })
            }
        }
        if (total > 0) {
            cSens /= total;
            hosp /= total;
            qcare /= total;
        }
        let id = hospital.id;
        let gmaps = "https://www.google.com/maps/place/" + address.replace(/\s/g, "+");
        let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5"><a href="hospitalTemplate.html?id=' + id + '">' + name + '</a></font></center><div class="col-md-3"><font size="4">Distance: ' + Math.round(proximity * 10) / 10 + ' Miles</font></div>' + '<div class="col-md-12"><center><a href ="' + gmaps + '">' + address + '</a></center></div>' + '<font size="4"><div class="col-md-3">Overall: <br><span class="rating" data-default-rating="' + (hosp + cSens + qcare) / 3 + '" disabled></span></div><div class="col-md-3">Hospitality: <br><span class="rating" data-default-rating="' + hosp + '" disabled></span></div><div class="col-md-3">Cultural Sensitivity: <br><span class="rating" data-default-rating="' + cSens + '" disabled></span></div><div class="col-md-3">Quality of Care: <br><span class="rating" data-default-rating="' + qcare + '" disabled></span></div></font></div>';
        console.log(element);
        $(element).appendTo("#summaries");
        counter++;
    }
    let w = window.location.href;
    updateRatings();
    // $.post(w.substring(0, w.indexOf("/", w.indexOf("//"))) + "hospital-info", JSON.stringify({ ids: ids }), function (data) {
    //     console.log(data);

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





