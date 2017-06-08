//Displays route given start and end, service and display

// AFRAME koristi nekade!
//SELENIUM IDE extention mozilla, maven/gradle 
function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    waypoints: [{
      location: 'Adelaide, SA'
    }, {
      location: 'Broken Hill, NSW'
    }],
    travelMode: 'WALKING',
    avoidTolls: true
  }, function (response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

//     [
//   {
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#ebe3cd"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#523735"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#f5f1e6"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#c9b2a6"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#dcd2be"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "elementType": "labels",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#ae9e90"
//       }
//     ]
//   },
//   {
//     "featureType": "landscape.man_made",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "landscape.natural",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "landscape.natural",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#dfd2ae"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#dfd2ae"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#93817c"
//       }
//     ]
//   },
  // {
  //   "featureType": "poi.business",
  //   "stylers": [
  //     {
  //       "visibility": "on"
  //     },
  //     {
  //       "weight": 8
  //     }
  //   ]
  // },
//   {
//     "featureType": "poi.business",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "visibility": "on"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.business",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "on"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.business",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "visibility": "on"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.business",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "visibility": "on"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#a5b076"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#447530"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#f5f1e6"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road.arterial",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#fdfcf8"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#f8c967"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#e9bc62"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway.controlled_access",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#e98d58"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway.controlled_access",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#db8555"
//       }
//     ]
//   },
//   {
//     "featureType": "road.local",
//     "elementType": "labels",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road.local",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#806b63"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.line",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#dfd2ae"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.line",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#8f7d77"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.line",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#ebe3cd"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.station",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#dfd2ae"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#b9d3c2"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#92998d"
//       }
//     ]
//   }
// ]