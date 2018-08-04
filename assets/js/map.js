var map;
// var infowindow;
var lat = -33.417974 ;
var lon = -70.606384;
var lugar = [];
var current;
var type = 'cafe';
var radio = 5000;
 var rank = document.getElementById("rank");



 if(navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(pos) {
     
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      current = new google.maps.LatLng(lat, lon);
      initMap(current);
       });
     };

function initMap () {

  map = new google.maps.Map(document.getElementById('map'), {
    center: current,
    zoom: 15
  });
  

  // infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);  
    service.nearbySearch({
      location: current,
      radius: radio,
      type: [type]
    }, callback);
};




$( "#places" ).change(function() {
    var e = document.getElementById("places");
    type = e.options[e.selectedIndex].text;
  console.log(type);
  initMap();
  callback();
});

$( "#radio" ).change(function() {
    var e = document.getElementById("radio");
    radio = e.options[e.selectedIndex].text;
  console.log(type);
  initMap();
  callback();
});

//  if (checkBox.checked == true){
//     text.style.display = "block";
//   } else {
//     text.style.display = "none";
//   }
// document.getElementById("checkbox").checked = true;
// document.getElementById("checkbox").checked = false;
  

  // var api = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
  // var key = 'AIzaSyD5Tsudko0x4s4krnsetBUwFF6oyzWg_7w';
  // var cors = 'https://cors-anywhere.herokuapp.com/';

  // var link = cors + api + lat + ',' + lon + '&radius=' + 10000 + '&type=cafe&key='+ key;
  //  $.ajax({
  //     url: link,
  //     method: 'GET'
  //   }).done(function(data){
  //     console.log(data);
      
      // var html = ' ';
      // $.each(data.results, function(i, item) {
      //   html += '<ul>' + item.name;
      //   $.each(item, function(j, item1){
      //     html += '<li>' + item1 + '</li>';
      //   });
      //   html += '</ul>';
      //   });
      //  $('#link').append(html);
    // });
// function ranked(obj) {
//   if ('rating' in obj  === 'undefined') {
//     return true;
//   } else {
//     return false;
//   }
// }



function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
  //      if (rank.checked == true){
  //       ranked();
  //       var results = results.filter(ranked);
  // } 

      createMarker(results[i]);

         lugar.push({
          nombre: results[i].name,
          open: results[i].opening_hours,
          rating: results[i].rating,
          address: results[i].vicinity,
          image: results[i].photos,
          price: results[i].price_level  });      
      
    }
       
      console.log(lugar);
  }
};



function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location

  });

        //listado de cafes
    // var placesList = document.getElementById('places');
    // var tr = document.createElement('tr');
    // tr.textContent = place.name;
    // placesList.appendChild(tr);

    var nombre = document.getElementById('name');
    var address = document.getElementById('address');
       
    google.maps.event.addListener(marker, 'click', function() {
     
      nombre.textContent = place.name;
      address.textContent = place.vicinity;

    });

};

      
