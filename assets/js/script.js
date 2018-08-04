// jQuery(document).ready( function($) {

//   navigator.geolocation.getCurrentPosition(function(pos) {

//     lat = pos.coords.latitude;
//     lon = pos.coords.longitude;
//     var current = new google.maps.LatLng(lat, lon);

//     var api = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
//     var key = 'AIzaSyD5Tsudko0x4s4krnsetBUwFF6oyzWg_7w';
//     var cors = 'https://cors-anywhere.herokuapp.com/';

//     link = cors + api + lat + ',' + lon + '&radius=' + 5000 + '&type=cafe&key='+ key;

//     $.ajax({
//       url: link,
//       method: 'GET'
//     }).done(function(data){
//       console.log(data)
//     });
//   });

// });
