navigator.geolocation.getCurrentPosition(function(pos) {

      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      var current = new google.maps.LatLng(lat, lon);

    