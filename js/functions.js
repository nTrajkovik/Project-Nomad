//callback used to performSearch()
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var res = results;
            res.forEach(function (element) {
                mustVisitPlaces.push(element);
            }, this);
            showMarkers(res);
        }
    }
    //function used to call the PlacesService
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

    /**
     * The all big and mighty createMarker function
     * @param {google.maps.places.PlaceResult} place 
     */
    function createMarker(place) {
        var id = uniqueId(); // get new id
        var marker = new google.maps.Marker({
            id: id,
            map: map,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
            icon: {
                url: "img/map-marker-small.svg",
                size: new google.maps.Size(71, 71),
                // anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            }
        });
        markers[id] = marker; // cache created marker to markers object with id as its key
        
        // ANIMATION
        function toggleBounce() {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 1400)
        }
        marker.addListener('click', toggleBounce);
        // ANIMATION END

        google.maps.event.addListener(marker, 'click', function () {
            let placeO = place;
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
                        '<img src="' + placeO.icon + '" height="20" width="20"/>' +
                        '<strong>' + placeO.name + '</strong>' + '<br>' +
                        '<img src="' + URL + '" height="auto" width="auto"/>' +
                        '<button onclick="routeToMarker({lat:' + marker.position.lat() + ',lng:' + marker.position.lng() + '})">Go there</button>' +
                        '<button onclick=" deleteMarker(' + marker.id + ')">Delete</button>' + '<br>' +
                        placeO.formatted_address + '</div>');
                    infowindow.open(map, marker);

                } else {
                    console.log("Something failed, status=" + status);
                }
            });
        });

    }
    //Show markers
    //TO-DO: add logic for not displaying/ adding existing markers
    function showMarkers(markers) {
        for (let i = 0; i < markers.length; i++) {
            createMarker(markers[i]);
        }
    }

    //Add submit listener and toggle listener
    document.getElementById('search-places').addEventListener('click', function () {
        performSearch();
    });

    document.getElementById('draw-route').addEventListener('click', function () {

        var locationWaypoints = [];
        for (var i = 0; i < mustVisitPlaces.length; i++) {
            locationWaypoints.push({
                location: mustVisitPlaces[i].geometry.location,
                stopover: true
            });
        }
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
        // console.log(mustVisitPlaces.length);
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
        createMarker(place);
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


function routeToMarker(position) {
    getCurrentLocation(calculateRouteToMarker, position);
}

function calculateRouteToMarker(currentPosition, position) {
    // Clear past routes
    if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('right-panel')
    });
    var from = {
        lat: currentPosition.position.lat(),
        lng: currentPosition.position.lng()
    };
    var to = position;
    calculateAndDisplayRoute(directionsService, directionsDisplay, from, to);
}
/**
 * Calculates and displays the route between two points
 * @param {*} directionsService 
 * @param {*} directionsDisplay 
 * @param {LatLng} from 
 * @param {LatLng} to 
 */
function calculateAndDisplayRoute(directionsService, directionsDisplay, from, to) {

    directionsService.route({
        origin: from,
        destination: to,
        travelMode: 'WALKING',
        optimizeWaypoints: true
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            map.setCenter(from);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

}