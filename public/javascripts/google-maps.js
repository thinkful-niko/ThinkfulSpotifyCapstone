var geocoder;
var map;
var marker;

var codeAddress = function () {
    geocoder = new google.maps.Geocoder();
  
  var address = document.getElementById('city_country').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 6,
            streetViewControl: false,
          mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              mapTypeIds:[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP] 
    },
    center: results[0].geometry.location,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
      map.setCenter(results[0].geometry.location);
      marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          draggable: true,
          title: 'My Title'
      });
      updateMarkerPosition(results[0].geometry.location);
      geocodePosition(results[0].geometry.location);
        
      // Add dragging event listeners.
  google.maps.event.addListener(marker, 'dragstart', function() {
    updateMarkerAddress('Dragging...');
  });
      
  google.maps.event.addListener(marker, 'drag', function() {
    updateMarkerStatus('Dragging...');
    updateMarkerPosition(marker.getPosition());
  });
  
  google.maps.event.addListener(marker, 'dragend', function() {
    updateMarkerStatus('Drag ended');
    geocodePosition(marker.getPosition());
      map.panTo(marker.getPosition()); 
  });
  
  google.maps.event.addListener(map, 'click', function(e) {
    updateMarkerPosition(e.latLng);
    geocodePosition(marker.getPosition());
    marker.setPosition(e.latLng);
  map.panTo(marker.getPosition()); 
  }); 
  
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function geocodePosition(pos) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      //updateMarkerAddress(responses[0].formatted_address);

  for (var i = 0; i < responses[0].address_components.length; i += 1) {
    var addressObj = responses[0].address_components[i];
    for (var j = 0; j < addressObj.types.length; j += 1) {
      if (addressObj.types[j] === 'country') {
        updateMarkerAddress(addressObj.short_name);
      }
    }
  }
    } else {
      updateMarkerAddress('Cannot determine address at this location.');
    }
  });
}

function updateMarkerStatus(str) {
  console.log(str);
  document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(latLng) {
  document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
}

function updateMarkerAddress(str) {
  console.log(str);
  $.post("/location", {countryCode: str}, function(result){
    document.getElementById('address').innerHTML = str;
    console.log(result);
  })
}
