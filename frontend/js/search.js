$(document).ready(() => {
    let input = '<input type = text id="zipinput"></input>'
    $("#zipinputdiv").html(input);
    $("#zipinput").keypress(function (event) {
        if (event.keyCode === 13) {//enter key
            let zipcode = $("#zipinput").val();
            if (zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {//if input is a 5 digit number(zip code format)
                let apidata = makeAPIRequest(zipcode, 20);
                $("#zip").html("");
            } else {
                $("<center>Please enter a zip code</center>").appendTo("#zipinputdiv");
            }
        }
    });
});

function makeAPIRequest(zipcode, radius) {
    console.log("Entered " + zipcode);
    //TODO
}