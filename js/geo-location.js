    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    // Try HTML5 geolocation.
    // function getLocation() {
    //     var returnPosition
function getCurrentLocation(_callback, toCallBackData) {
    // conџsole.log(position);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            map.setCenter(pos);

            var currentPos = new google.maps.Marker({
                position: {
                    lat: pos.lat,
                    lng: pos.lng
                },
                map: map,
                icon: {
                    url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
                    scaledSize: new google.maps.Size(20, 34)
                },
                title: 'You are here!'
            });
            _callback(currentPos, toCallBackData);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
    // END Geo-location