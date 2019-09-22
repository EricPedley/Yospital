$(document).ready(() => {
    let input = '<input type = text id="zipinput"></input>';
    $("#zipinputdiv").html(input);
    $("#zipinput").keypress(function (event) {
        if (event.keyCode === 13) {//enter key
            let zipcode = $('#zipinput').val();
            if (zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {//if input is a 5 digit number(zip code format)
                let apidata = makeAPIRequest(zipcode, 20);
                console.log(apidata);
                apidata.forEach((hospital,index) => {
                    let id = hospital.id;
                    let name = hospital.name;
                    let address=hospital.address;
                    let proximity = hospital.proximity;
                    let rating = hospital.rating;
                    let cSens = rating["Cultural Sensitivity"];
                    let hosp = rating["Hospitality"];
                    let element = '<div class="col-md-12 border summary"><center class="col-md-9"><font size="5">'+name+'</font></center><div class="col-md-3"><font size="4">Distance: '+proximity+' Miles</font></div><font size="4"><div class="col-md-4">Overall: <span class="rating" data-default-rating="'+(hosp+cSens)/2+'" disabled></span></div><div class="col-md-4">Hospitality: <span class="rating" data-default-rating="'+hosp+'" disabled></span></div><div class="col-md-4">Cultural Sensitivity: <span class="rating" data-default-rating="'+cSens+'" disabled></span></div></font></div>';
                    $(element).appendTo("#summaries");
                    
                });
                $('#zip').html('');
                $('#botheader').html('<font size=6>Hospitals Near You:</font>');
                updateRatings();
            } else {
                alert("Please enter a zip code");
                //$('<center id = "ziperror">Please enter a zip code</center>').appendTo('#zipinputdiv');
            }
        }
    });
});

function makeAPIRequest(zipcode, radius) {
    console.log("Entered " + zipcode);
    let response = '[{"name":"Example General Hospital","rating":{"Cultural Sensitivity":4.2,"Hospitality":1.3},"proximity":0.5},{"name":"Sample Text Hospital","rating":{"Cultural Sensitivity":2.6,"Hospitality":3.3},"proximity":1.9}]'
    $.post("http://localhost:3000/hospital-list",JSON.stringify('{long:-122.419416,lat:37.774929}'),function(data) {
        console.log(data);
        return JSON.parse(data);
    });
}

updateRatings = ()=>{
    var ratings = document.getElementsByClassName('rating');

        for (var i = 0; i < ratings.length; i++) {
            var r = new SimpleStarRating(ratings[i]);

            ratings[i].addEventListener('rate', function (e) {
                console.log('Rating: ' + e.detail);
            });
        }
};