var tempCF = {
  Celsius: null,
  Fahrenheit: null,
  FeelsLikeCelsius: null,
  FeelsLikeFahrenheit: null
};

var buttonCel = document.getElementById('buttonC');
var buttonFahr = document.getElementById('buttonF');

buttonCel.addEventListener('click', setCelsius);
buttonFahr.addEventListener('click', setFahrenheit);


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(requestWeather);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function requestWeather(position) {
  var latitude = position.coords.latitude,
      longitude = position.coords.longitude,
      url = "https://api.darksky.net/forecast/9a871a9c726e573624d3c2f97eae1f6b/" +
        latitude + "," + longitude + "?callback=?&exclude=[minutely,hourly,daily,alerts,flags]&units=si";

    $.getJSON (url, showWeather);
}

function showWeather(data) {
  var icon = data.currently.icon;

  tempCF.Celsius = (data.currently.temperature).toFixed();
  tempCF.Fahrenheit = (data.currently.temperature*1.8+32).toFixed();

  tempCF.FeelsLikeCelsius = (data.currently.apparentTemperature).toFixed();
  tempCF.FeelsLikeFahrenheit = (data.currently.apparentTemperature*1.8+32).toFixed();

  $("body").css("background-image", 'url(img/' + icon + '.jpg)').removeClass("hide-all");



  $("#humidity").html(data.currently.humidity*100);
  $("#summary").html(data.currently.summary);
  $("#windSpeed").html((data.currently.windSpeed).toFixed());
  setCelsius();
}

function setCelsius() {
  $("#temperature").html(tempCF.Celsius + " °C");
  $("#realTemp").html(tempCF.FeelsLikeCelsius + " °C");
  $("#buttonF").show();
  $("#buttonC").hide();
}

function setFahrenheit() {
  $("#temperature").html(tempCF.Fahrenheit + " °F");
  $("#realTemp").html(tempCF.FeelsLikeFahrenheit + " °F");
  $("#buttonC").show();
  $("#buttonF").hide();
}


getLocation();
