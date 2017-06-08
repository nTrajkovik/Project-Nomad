// FUNTIONS
//Get features - MochUp for server side
function getFeatures() {
  var features = [{
    position: {
      lat: 42.004551,
      lng: 21.391762
    },
    type: 'green',
    title: "Skopje City Mall"
  }, {
    position: {
      lat: 42.011974,
      lng: 21.416307
    },
    type: 'yellow',
    title: "Zoo"
  }, {
    position: {
      lat: 41.986897,
      lng: 21.439830
    },
    type: 'red',
    title: "Seavus Educational and Development Centar"
  }];
  return features;
}

/**
 * Computes total distance
 * and inserts it into right panel
 * @param {*} result 
 */
function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}

//Calculates and displays the route
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var waypts = [];
  var start;
  var end;
  var fts = getFeatures() || [];
  start = fts[0].position;
  end = fts[fts.length - 1].position

  for (var i = 0; i < mustVisitPlaces.length; i++) {
    waypts.push({
      location: mustVisitPlaces[i].geometry.location,
      stopover: true
    });
  }
  for (var i = 1; i < fts.length - 1; i++) {
    waypts.push({
      location: new google.maps.LatLng(fts[i].position.lat, fts[i].position.lng),
      stopover: true
    });
  }
  directionsService.route({
    origin: start,
    destination: end,
    waypoints: waypts,
    travelMode: 'WALKING',
    optimizeWaypoints: true
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      map.setCenter(start);
      // var route = response.routes[0];
      // var summaryPanel = document.getElementById('directions-panel');
      // summaryPanel.innerHTML = '';
      // // For each route, display summary information.
      // for (var i = 0; i < route.legs.length; i++) {
      //   var routeSegment = i + 1;
      //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
      //       '</b><br>';
      //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
      //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
      //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      // }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// END

(() => {
  var map;
  var iconBase = 'https://maps.google.com/mapfiles/ms/micons/';
  var icons = {
    yellow: {
      icon: iconBase + 'yellow.png'
    },
    green: {
      icon: iconBase + 'green.png'
    },
    red: {
      icon: iconBase + 'red.png'
    }
  };
  // animation for login screen
  let login = document.getElementById('login-box');
  setTimeout(function () {
    login.style.backgroundColor = 'black';
    login.style.width = '1500px';
    setTimeout(function () {
      document.getElementById('intro-screen').style.display = 'none';
    }, 3000)
  }, 100);
})();