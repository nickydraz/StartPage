//Funciton that is run as soon as the page is ready
function onLoad() {
    //delay the page loaded animations for 600 ms,
    // to allow for everything to load before starting animation
    setTimeout(function () {
        $(".site-listing")
            .show(600);
    }, 600);

    // add an onclick event handler for the link groupings
    $(".group-label")
        .click(function () {
            var sThisId = this.id;

            var sID = "#site-list-" + sThisId;
            $(sID)
                .slideToggle();

        }); // end onClick function

    // add an onHover event handler for the links
    $(".list")
        .hover(function () {
            $(this)
                .css("box-shadow", "inset 1px 1px 10px #000");
            $(this)
                .css("cursor", "pointer");
        }, function () {
            $(this)
                .css("box-shadow", "none");

        }); // end onHover function

    //TODO find a nice animation/style change for when a link is clicked on.
    //$(".list")
    //  .click(function () {
    //    var clickedAnchor = this
    //      .closest("a")
    //    .href;
    //$(this)
    //  .fadeOut(
    //    300,
    //  "swing",
    //function () {

    //  location.href = clickedAnchor;
    //}); //css("box-shadow", "inset 10px 10px 10px #000");

    //return false;
    //}); // end link onClick function
} // end onLoad

//funtion found on StackOverflow for forcing a delay.
// use sparringly...
function sleepFor(sleepDuration) {
    var now = new Date()
        .getTime();
    while (new Date()
        .getTime() < now + sleepDuration) { /* do nothing */ }
}

//Function that loads in the weather information based on current location
function weather() {

    var state = "";
    var city = "";

    //JSON response object
    var sLoc;

    jQuery.when(
            sLoc = jQuery.getJSON("http://freegeoip.net/json/")

        )
        .done(function (json) {
            //if the JSON fetch failed, set default values here
            if (sLoc === null) {
                city = "Bolingbrook";
                state = "IL";
            } else {
                state = sLoc.responseJSON.region_code;
                city = sLoc.responseJSON.city;
            }

            //Perform a try/catch here just in case the user
            // doesn't have simpleWeather installed
            try {
                $.simpleWeather({
                    location: city + ", " + state,
                    woeid: '',
                    unit: 'f',
                    success: function (weather) {
                        html = '<span>' + weather.city + ", " + weather.region + " " + weather.temp + '&deg;' + weather.units.temp + " " + weather.currently + '</span>';

                        $("#weather")
                            .html(html);
                    },
                    error: function (error) {
                        $("#weather")
                            .html('<span>Welcome. Where would you like to go?</span>');
                        Console.log(error);
                    }
                }); // end $.simpleWeather
            } catch (err) {
                //simpleWeather may not be installed
                $("#weather")
                    .html('<span>Welcome. Where would you like to go?</span>');
            } // end try catch block
        }); //end jQuery.when/done block
}

//Function that loads in a digital clock on the page
function time() {
    var interval = setInterval(function () {
        var momentNow = moment();
        $('#time-part')
            .html(momentNow.format('hh:mm:ss A'));
    }, 100);
    $('#stop-interval')
        .on('click', function () {
            clearInterval(interval);
        });
}

function SubmitSearch() {
    var quickPattern = /^reddit$|^facebook$|^twitter$|^youtube$|^amazon$|^netflix$|^hulu$|^hbo$|^hbo now$|^hbonow$|^github$|^code school$|^codeschool$|^tfs$|^teamserver$|^team$|^stack$|^stackoverflow$|^stack overflow$/;
    var pattern = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    var userVal = $('#searchBar')
        .val();

    if (quickPattern.test(userVal)) {
        var url = "";
        switch (userVal) {
        case "teamserver":
        case "tfs":
        case "team":
            {
                url = "http://teamserver:8080/tfs";
                break;
            }
        case "hbo":
            {
                url = "https://www.hbonow.com";
                break;
            }
        case "stack":
            {
                url = "https://www.stackoverflow.com";
                break;
            }
        default:
            {
                url = "https://www." + userVal.replace(' ', '') + ".com";
                break;
            }
        }

        $(location)
            .attr("href", url);
        return;
    }

    if (pattern.test(userVal)) {
        pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*) /;
        if (pattern.test(userVal)) {
            $(location)
                .attr("href", userVal);
        } else {
            $(location)
                .attr("href", "http://" + userVal);
        }

    } else {
        $(location)
            .attr("href", "https://duckduckgo.com?q=" + userVal);
    }
}
