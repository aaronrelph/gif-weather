function getLocation() {
  navigator.geolocation.getCurrentPosition(weather, function(error){ console.log(error) });
}

function GetDates(startDate, daysToAdd) {
  var aryDates = [];
  var currentDay = [];

  for(var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date();
      currentDate.setUTCDate(startDate.getUTCDate() + i);
      currentDay.push(DayAsString(currentDate.getUTCDay()));
      // aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
      aryDates.push(currentDate.getUTCFullYear() + "-" + MonthAsString(currentDate.getUTCMonth()) + "-" + ("0" + (currentDate.getUTCDate()+1)).slice(-2) + "T12:00:00-0400");
  }

  return aryDates;
  return currentDay;
}

function MonthAsString(monthIndex) {
    var d=new Date();
    var month=new Array();
    month[0]="01";
    month[1]="02";
    month[2]="03";
    month[3]="04";
    month[4]="05";
    month[5]="06";
    month[6]="07";
    month[7]="08";
    month[8]="09";
    month[9]="10";
    month[10]="11";
    month[11]="12";

    return month[monthIndex];
}

function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
}

var startDate = new Date();
var aryDates = GetDates(startDate, 7);



function weather(position) {
  var apiKey = '62973e50ea4774b9d61cbd226eac21f5';
  var url = 'https://api.forecast.io/forecast/';
  var data;
  var dayOfWeek = '2016-04-25T12:00:00-0400';
  var dayOfWeek = '2016-05-08T12:00:00-0400';
  var forecastDate = aryDates;



  // Current conditions call
  var currentConditions = $.getJSON(url + apiKey + "/" + position.coords.latitude + "," + position.coords.longitude + "?callback=?", function(data) {

    $('.js-current-temp').html(Math.floor(data.currently.temperature) + '&#176;');
    $('.js-current-icon').html(data.currently.summary);

    if (data.currently.icon === 'cloudy') {
      data.currently.icon = 'sunny';
      console.log(data.currently.icon);
    }


    gif(data.currently.icon)
    city(position.coords.latitude + "," + position.coords.longitude)

  });

  // 7 day forecast call
  for (i = 0; i <= 7; i++) {

    (function(i) { // protects i in an immediately called function
      $.getJSON(url + apiKey + "/" + position.coords.latitude + "," + position.coords.longitude + "," + aryDates[i] + "?callback=?", function(data) {

        // var listItem = document.createElement("li");
        // listItem.className = "js-day-temp";
        // listItem.innerHTML = aryDates[i];
        $('.js-forecast').append('<li class="js-day-temp">' + aryDates[i] + '</li>');
        // $('.js-day-of-the-week').html(forecastDay[i]);
        $('.js-day-temp').html(Math.floor(data.daily.data[i].temperatureMin) + '&#176;');
        // $('.js-day-temp').html(Math.floor(data.daily.data[0].temperatureMin) + '&#176;');
        // console.log(DayAsString(i));
        // console.log(aryDates[i]);
        //
        console.log(data);
        console.log(aryDates[i]);
      });
    })(i);

  }
}

function city(latlng) {
  var apiKey = '&key=AIzaSyCiFoZaSWCX5KwcCDbnmmrQv-9NxipZb6c';
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

  $.getJSON(url + latlng + apiKey, function(results) {
    // console.log(results)
    $('.js-current-location').html(results.results[2].address_components[0].long_name);
  });
}

function gif(status) {
  var apiKey = '&api_key=dc6zaTOxFJmzC';
  var url = 'http://api.giphy.com/v1/gifs/search?q=';
  var query = status;
  $.getJSON(url + query + apiKey, function(data) {
    // console.log(data);
    var randomIndex = Math.floor(Math.random() * data.data.length);
    $('body').css('background-image', 'url(' + data.data[randomIndex].images.original.url + ')');
  });
}

getLocation();
