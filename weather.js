
function getLocation() {
  navigator.geolocation.getCurrentPosition(weather, function(error){ console.log(error) });
}

function weather(position) {
  var apiKey = '62973e50ea4774b9d61cbd226eac21f5';
  var url = 'https://api.forecast.io/forecast/';
  var data;
  console.log(position);
  $.getJSON(url + apiKey + "/" + position.coords.latitude + "," + position.coords.longitude + "?callback=?", function(data) {
    console.log(data)
    $('.js-current-location').html('Location: ' + data.timezone);
    $('.js-current-temp').html('The temperature is: ' + data.currently.temperature);
    $('.js-current-icon').html('and it is: ' + data.currently.icon);

    gif(data.currently.icon)

  });
}

function gif(status) {
  var apiKey = '&api_key=dc6zaTOxFJmzC';
  var url = 'http://api.giphy.com/v1/gifs/search?q=';
  var query = status;
  $.getJSON(url + query + apiKey, function(data) {
    console.log(data);
    $('body').css('background-image', 'url(' + data.data[0].images.original.url + ')');

  });
}

getLocation();
