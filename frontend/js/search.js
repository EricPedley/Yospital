$(document).ready(() => {
    let input = '<input type = text id="zipinput"></input>';
    $("#zipinputdiv").html(input);
    $("#zipinput").keypress(function (event) {
        if (event.keyCode === 13) {//enter key
            let zipcode = $('#zipinput').val();
            if (zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {//if input is a 5 digit number(zip code format)
                let apidata = makeAPIRequest(zipcode, 20);
                console.log(apidata);
                apidata.hospitals.forEach((hospital => {
                    let id = hospital.id;
                    let name = hospital.name;
                    let proximity = hospital.proximity;
                    let rating = hospital.rating;
                    let cSens = rating["Cultural Sensitivity"];
                    let hosp = rating["Hospitality"];
                    let element = "<div class='container'><div class = 'col-md-9'>"+name+"</div><div class = 'col-md-3'>"+proximity+"</div><div class = 'col-md-12'>Hospitality: "+hosp+" Cultural Sensitivity: "+cSens+"</div></div>";
                    $(element).appendTo("#summaries");
                }));
                $('#zip').html('');
            } else {
                $('<center id = "ziperror">Please enter a zip code</center>').appendTo('#zipinputdiv');
            }
        }
    });
});

function makeAPIRequest(zipcode, radius) {
    console.log("Entered " + zipcode);
    let response = '{"hospitals":[{"name":"h1","rating":{"Cultural Sensitivity":4.2,"Hospitality":1.3},"proximity":0.5},{"name":"h2","rating":{"Cultural Sensitivity":2.6,"Hospitality":3.3},"proximity":1.9}]}'
    return JSON.parse(response);
}