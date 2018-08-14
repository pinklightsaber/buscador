var map;
var current;
var type = $('img.tipo').attr("id");
var radio = 2000;
var request;


if(navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(pos) {
     
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      current = new google.maps.LatLng(lat, lon);
      initMap(current);
       },

    function(){

  $("#al").show();
  $('#cont').append('Si no has permitido la localización, recarga la página para ello');
});
}; 




function initMap () {

  map = new google.maps.Map(document.getElementById('map'), {
    center: current,
    zoom: 15 
  });
  

  var service = new google.maps.places.PlacesService(map);  
    service.nearbySearch({
      location: current,
      radius: radio,
      type: [type]
    }, callback);
};
$('.img-all').on('click', function(){
  type = this.id;
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


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);  
      
    }
    console.log(results)

  }
};

function crearDatos (){
 
  var serv = new google.maps.places.PlacesService(map); 
    $('span').empty();
    $('#img-container').empty();

    serv.getDetails(request, function(lugar){
        console.log(lugar) //GREAAAAAAAAAT
 
       $('#name').text(lugar.name);
       $('#address').text(lugar.vicinity);

      if(lugar.opening_hours !== undefined){
        if(lugar.opening_hours.open_now = true){
          $('#open_close').text('Abierto');
        }else if (lugar.opening_hours.open_now = false){
          $('#open_close').text('Cerrado');
        }else{
          $('#open_close').text(' ');
        }  
      };
   
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

      if (lugar.website) {
        $('#website').html('<a href="'+ lugar.website +'">Sitio web</a>'); //HERE
      }

      $('#fono').text(lugar.international_phone_number)

      if(lugar.photos){  //HERE
         var photos = lugar.photos;
        var list = $('#img-container').append('<ul class="slides"></ul>').find('ul');
                
        for (var i=0;i<photos.length;i++){
            list.append('<li> <img src = ' + photos[i].getUrl({'maxWidth':400, 'maxHeight': 400})+ '> </li>');
} 

        // var photos = lugar.photos;
        //var list = $('#img-container').append('<ul class="slides"></ul>').find('ul');

        // var slider = $('#img-container');
        // var html = '<ul class="slides">';

        // lugar.photos.forEach(function(elem) {

        //   html += '<li><img src="'+ elem.getUrl() + '"></li>';
          
        // })

        // html += '</ul>';
        // console.log(lugar.photos);

        //slider.append(html + '</ul>');

        
      }
      $('.flexslider').flexslider({
             animation: "slide"
          });
    });
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,

    position: place.geometry.location

  });


    google.maps.event.addListener(marker, 'click', function() {
    var id = place.place_id;
    request = {
      placeId : id
    };

    // $('#detalle').addClass('active');
    // $('#detalle').removeClass('fade');
    $('.pilldetalle > a').tab('show');
      $('html,body').animate({
    scrollTop: $("#detalle").offset().top
      }, 2000);
      crearDatos();   

  });

};

