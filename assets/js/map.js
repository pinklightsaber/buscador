var map;
// var infowindow;
var lat = -33.417974 ;
var lon = -70.606384;
var lugar = [];
var current;
var type = 'cafe';
var radio = 2000;




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

  // var link = cors + api + lat + ',' + lon + '&radius=' + 5000 + '&type=cafe&key='+ key;
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
//   lugar.findIndex(x => x.rating === 'undefined');
//   if (rank.checked == true){
       
//         var results = results.filter(ranked);
//   } 
//   if ('rating' in obj  === 'undefined') {
//     return true;
//   } else {
//     return false;
//   }
// }



function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      
  //      if(this.rating === undefined){
  //       console.log(results.rating)
  //       if (rank.checked == true){
  //           // results.splice(i , 1);
            
  //       }

  // } 
       

      createMarker(results[i]);

         // lugar.push({
         //  nombre: results[i].name,
         //  open: results[i].opening_hours,
         //  rating: results[i].rating,
         //  address: results[i].vicinity,
         //  image: results[i].photos,
         //  price: results[i].price_level  });      
      
    }
    console.log(results)
       
      // console.log(lugar);
// 
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
    // var photo = document.getElementById('photo');
    var price = document.getElementById('price');
    var id = place.place_id;
    var request = {
      placeId : id
    };

     var serv = new google.maps.places.PlacesService(map); 

    google.maps.event.addListener(marker, 'click', function() {
        // $('p').empty();
        $('span').empty();
        $('#img-container').empty();

        serv.getDetails(request, function(lugar){
        console.log(lugar) //GREAAAAAAAAAT
      
     
      nombre.textContent = lugar.name;
      address.textContent = lugar.vicinity;


      if(lugar.opening_hours !== undefined){
         if(lugar.opening_hours.open_now = true){
        $('#open_close').text('Abierto');
        }else if (lugar.opening_hours.open_now = false){
        $('#open_close').text('Cerrado');
      }else{
        $('#open_close').text(' ');
      }  }

     
      
      if(lugar.rating>4.5){
        $('#rating').text('Excelentes reseñas');
      }else if (lugar.rating> 4){
        $('#rating').text('Buenas reseñas');
      }else {
        $('#rating').text('Reseñas moderadas');
      }

      if(lugar.price_level=0){
        $('#price').text('Casi gratis');
      }else if (lugar.rating<=1){
        $('#price').text('Muy barato');
      }else if (lugar.rating<=2){
        $('#price').text('Barato');
      }else if (lugar.rating<=3){
        $('#price').text('Moderado');
      } else {
        $('#price').text('Un poco caro');
      }
      $('#website').text(lugar.website);
      $('#fono').text(lugar.international_phone_number)

      if(lugar.photos){ 
         

        var photos = lugar.photos;
        var list = $('#img-container').append('<ul class="slides"></ul>').find('ul');
                
        for (var i=0;i<photos.length;i++){
            list.append('<li> <img src = ' + photos[i].getUrl({'maxWidth':500, 'maxHeight': 500})+ '> </li>');
        }  
        $('.flexslider').flexslider({
             animation: "slide"
          });
      }
    });
  });

};

      
