var latitude = '';
var longitude = '';
var tempC = '';
var tempF = '';

$(document).ready(function() {
    $('#results').addClass('fa fa-spin fa-cog fa-3x');
    navigator.geolocation.getCurrentPosition(success);
});

function success(position) {
    var crd = position.coords;
    latitude = crd.latitude;
    longitude = crd.longitude;
    doAjax();
}

var convertToCelsius = function(input) {
    var result = Math.floor((input - 32) * .5556);
    return result;
};

$('.fahrenheit').on('click', function() {
    $('#temp').html('<h3>' + tempF + '°' + '</h3>');
})

$('.celsius').on('click', function() {
    $('#temp').html('<h3>' + tempC + '°' + '</h3>');
})

var doAjax = function() {
    $('#results').empty();
    $('#test').removeClass();
    var apiKey = '585e1993c9865dbfc8dcf29d6162e3c9';
    $.ajax({
        url: 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            $('#results').removeClass('fa fa-spin fa-cog fa-3x');
            $('#loading').empty();
            var timezone = data.timezone;
            var city = timezone.substring(timezone.lastIndexOf("/") + 1);
            tempF = parseInt(data.currently.temperature);
            tempC = convertToCelsius(tempF);
            $('#results').html('<h3>' + data.currently.summary + '</br>' + city + '</h3>');
            $('#temp').html('<h3>' + tempC + '°' + '</h3>');

            //Options: clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
            switch (data.currently.icon) {
                case 'clear-day':
                    $('#test').addClass('wi wi-day-sunny largeIcons');
                    break;
                case 'clear-night':
                    $('#test').addClass('wi wi-night-clearlargeIcons');
                    break;
                case 'rain':
                    $('#test').addClass('wi wi-day-rain largeIcons');
                    break;
                case 'snow':
                    $('#test').addClass('wi wi-day-snow largeIcons');
                    break;
                case 'sleet':
                    $('#test').addClass('wi wi-day-sleet largeIcons');
                    break;

                case 'wind':
                    $('#test').addClass('wi wi-day-windy largeIcons');
                    break;
                case 'fog':
                    $('#test').addClass('wi wi-day-fog largeIcons');;
                    break;
                case 'cloudy':
                    $('#test').addClass('wi wi-cloudy largeIcons');;
                    break;
                case 'partly-cloudy-day':
                    $('#test').addClass('wi wi-day-cloudy largeIcons');;
                    break;
                case 'partly-cloudy-night':
                    $('#test').addClass('wi wi-night-cloudy largeIcons');;
                    break;


                default:
                    $('#test').text(' no icon available ');;
            }

        }
    });
};
