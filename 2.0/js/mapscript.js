var latitude = 33.755;
var longitude = -84.39;
function initialize() {
  var mapOptions = {
    center: { lat: latitude, lng: longitude},
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROAD
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);


/*window.onload = function() {
  var latitude = 44.503;
  var longitude = -78.5463;
  var startPos;
  if (navigator.geolocation) {
    console.log("success");
    var geoSuccess = function(position) {
      startPos = position;
      console.log(startPos.coords.latitude);
      // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
      // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      latitude = startPos.coords.latitude;
      longitude = startPos.coords.longitude;
      console.log(latitude, longitude);
    };
    // var geoError = function(position) {
    //   console.log('Error occurred. Error code: ' + error.code);
    //   // error.code can be:
    //   //   0: unknown error
    //   //   1: permission denied
    //   //   2: position unavailable (error response from location provider)
    //   //   3: timed out
    // };
    // navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
    alert("Please turn on location services to continue.");
  }

  function initialize() {
    var mapOptions = {
      center: { lat: latitude, lng: longitude},
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROAD
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);
};*/