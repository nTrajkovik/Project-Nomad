var mustVisitPlaces = [];

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
// var map;
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

// END

//initMap()
function initMap() {
    var mapOptions = {
        zoom: 16,
        center: {
            lat: 42.005139,
            lng: 21.406801
        },
        mapTypeId: 'roadmap',
        styles: [{
            stylers: [{
                visibility: 'simplified'
            }]
        }, {
            elementType: 'labels',
            stylers: [{
                visibility: 'off'
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "weight": 20
                }
            ]
        }]
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //Initializing services
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    
    var PlacesService = new google.maps.places.PlacesService(map);
    // PlacesService.nearbySearch({
    //     location: {
    //         lat: 42.005139,
    //         lng: 21.406801
    //     },
    //     radius: 800,
    //     type: ['bakery', 'bar', 'bowling_alley', 'cafe',
    //     'convenience_store', 'department_store',
    //     'food', 'liquor_store', 'restaurant']
    // }, callback);

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var res = results;
            res.forEach(function (element) {
                mustVisitPlaces.push(element);
            }, this);
            showMarkers(res);
        }
    }

    function performSearch() {
        var request = {
            bounds: map.getBounds(),
            keyword: 'cafe restaurant bar food'
        };
        PlacesService.radarSearch(request, callback);
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


    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        function make_callback(place) {
            return function () {
                return place;
            };
        }
        google.maps.event.addListener(marker, 'click', function(){
            let placeO = make_callback(place)();
            console.log(placeO);
            PlacesService.getDetails({
                    placeId: placeO.place_id
                }, function (placeO, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        var URL = "";
                        if (placeO.photos && placeO.photos.length > 0) {
                            URL = placeO.photos[0].getUrl({
                                'maxHeight': 100
                            });
                        }
                        infowindow.setContent(
                            '<div>' +
                            '<strong>' + placeO.name + '</strong><br>' +
                            '<img src="' + placeO.icon + '" height="25" width="25"/>' + '<br>' +
                            '<img src="' + URL + '" height="auto" width="auto"/>' + '<br>' +
                            placeO.formatted_address + '</div>');
                        infowindow.open(map, marker);

                    } else {
                        console.log("Something failed, status=" + status);
                    }
                });
        });

    }

    //Show markers
    function showMarkers(markers) {
        for (let i = 0; i < markers.length; i++) {
            createMarker(markers[i]);
        }
    }
    //Calculates and displays the route
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var waypts = [];
        var markers = mustVisitPlaces;
        var start = markers[0].geometry.location;
        var end = markers[markers.length - 1].geometry.location;

        for (var i = 0; i < 23; i++) {
            waypts.push({
                location: markers[i].geometry.location,
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
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions-panel');
                summaryPanel.innerHTML = '';
                // For each route, display summary information.
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
    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
    });
    //Add submit listener and toggle listener
    document.getElementById('search-places').addEventListener('click', function () {
        // calculateAndDisplayRoute(directionsService, directionsDisplay);
        performSearch();
        console.log(mustVisitPlaces.length);
    });

    document.getElementById('draw-route').addEventListener('click', function () {

        var locationWaypoints = [];
        for (var i = 0; i < mustVisitPlaces.length; i++) {
            locationWaypoints.push({
                location: mustVisitPlaces[i].geometry.location,
                stopover: true
            });
        }
        console.log(mustVisitPlaces.length);
        // get directions and draw on map
        gDirRequest(directionsService, locationWaypoints, function drawGDirLine(path) {
            var line = new google.maps.Polyline({
                clickable: false,
                map: map,
                path: path,
                strokeColor: "#228B22",
                strokeOpacity: 0.8,
                strokeWeight: 3
            });
        });
    });

    document.getElementById('auto-complete-hide').addEventListener('click', function () {
        console.log(mustVisitPlaces.length);
        var autoCmplt = document.getElementById('pac-card');
        if (autoCmplt.style.display === 'block') {
            autoCmplt.style.display = 'none';
        } else {
            autoCmplt.style.display = 'block';
        }
    });

    document.getElementById('directions-toggle').addEventListener('click', function () {
        var x = document.getElementById('map');
        var y = document.getElementById('right-panel');
        if (x.style.display === 'none') {
            x.style.display = 'block';
            this.textContent = 'Directions';
            y.style.display = 'none';
        } else {
            x.style.display = 'none';
            this.textContent = 'Map';
            y.style.display = 'block';
        }
    });
    
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    //Auto-complete handler
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    var autocomplete = new google.maps.places.Autocomplete(input);
    /**
     * Bind the map's bounds (viewport) property to the autocomplete object,
     * so that the autocomplete requests use the current map bounds for the
     * bounds option in the request. 
     */

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        mustVisitPlaces.push(
            place
        );
        //empty the input field and save the markerArray
        document.getElementById('pac-input').value = '';
        // localStorage.setItem('mustVisitPlaces', JSON.stringify(mustVisitPlaces));
        // marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });


}
//END InitMap