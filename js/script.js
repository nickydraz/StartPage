function onLoad() {
    // show the listings
    setTimeout(function () {
        $(".site-listing")
            .show(600);
    }, 600);


    $(".group-label")
        .click(function () {
            var sThisId = this.id;

            var sID = "#site-list-" + sThisId;
            $(sID)
                .slideToggle();

        });
    $(".list")
        .hover(function () {
            $(this)
                .css("box-shadow", "inset 1px 1px 10px #000");
            $(this)
                .css("cursor", "pointer");
        }, function () {
            $(this)
                .css("box-shadow", "none");

        });

    $(".list")
        .click(function () {
            var clickedAnchor = this
                .closest("a")
                .href;
            $(this)
                .fadeOut(
                    300,
                    "swing",
                    function () {

                        location.href = clickedAnchor;
                    }); //css("box-shadow", "inset 10px 10px 10px #000");

            return false;
        });
}

function sleepFor(sleepDuration) {
    var now = new Date()
        .getTime();
    while (new Date()
        .getTime() < now + sleepDuration) { /* do nothing */ }
}

function weather() {

    var state = "";
    var city = "";
    var sLoc;
    jQuery.when(
            sLoc = jQuery.getJSON("http://freegeoip.net/json/")

        )
        .done(function (json) {
            if (sLoc == null) {
                city = "Bolingbrook";
                state = "IL";
            } else {
                state = sLoc.responseJSON.region_code;
                city = sLoc.responseJSON.city;
            }

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
                        .html('<p>' + error + '</p>');
                }
            });
        });
}

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
