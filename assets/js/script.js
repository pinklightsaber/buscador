
      var map;
      var infowindow;

      function initMap() {
        navigator.geolocation.getCurrentPosition(function(pos) {

      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      var current = new google.maps.LatLng(lat, lon);
      var api = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';

      var key = 'AIzaSyD5Tsudko0x4s4krnsetBUwFF6oyzWg_7w';
      var link = api + lat + ',' + lon + '&radius=' + 5000 + '&type=cafe&key='+ key;

      console.log(link);

        map = new google.maps.Map(document.getElementById('map'), {
          center: current,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: current,
          radius: 5000,
          type: ['cafe']
        }, callback);
      }); };

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location

        });

        //listado de cafes
          var placesList = document.getElementById('places');
          var tr = document.createElement('tr');
          tr.textContent = place.name;
          placesList.appendChild(tr);

        var nombre = document.getElementById('name');
        var address = document.getElementById('address');
       
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          nombre.textContent = place.name;
          address.textContent = place.vicinity;
          infowindow.open(map, this);

         
        });
 
      };

      
