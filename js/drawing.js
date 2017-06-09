/*
*    Recursive function that sends batches of latlongs to a google.maps.DirectionsService and passes the resulting path to a userFunction
*    NB: overcomes the maximum 8 waypoints limit imposed by the service
*    
*    @param {google.maps.DirectionsService} service
*    @param {array} waypoints
*    @param {function} userFunction
*    @param {optional int} waypointIndex
*    @param {optional array} path - stores the latlongs of the travel route
*/
function gDirRequest(DirectionService, waypoints, userFunction, waypointIndex, path) {
    
    // set defaults
    waypointIndex = typeof waypointIndex !== 'undefined' ? waypointIndex : 0;
    path = typeof path !== 'undefined' ? path : [];

    // get next set of waypoints
    var s = gDirGetNextSet(waypoints, waypointIndex);

    // build request object
    var startl = s[0].shift()["location"];
    var endl = s[0].pop()["location"];
    var request = {
        origin: startl,
        destination: endl,
        waypoints: s[0],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
        optimizeWaypoints: true,
        provideRouteAlternatives: false,
        avoidHighways: false,
        avoidTolls: false
    };
    // console.log(request);

    DirectionService.route(request, function(response, status) {

        if (status == google.maps.DirectionsStatus.OK) {
            
            path = path.concat(response.routes[0].overview_path);

            if (s[1] != null) {
                gDirRequest(DirectionService, waypoints, userFunction, s[1], path)
            } else {
                userFunction(path);
            }

        } else {
            console.log(status);
        }
        
    });
}


/*
*    Return an array containing:
*    1) the next set of waypoints to send to Google, given the start index, and 
*    2) then next waypoint to start from after this set, or null if there is no more.
*
*    @param {google.maps.DirectionsService} service
*    @param {array} waypoints
*    @returns {array}
*/
function gDirGetNextSet (waypoints, startIndex) {
    var MAX_WAYPOINTS_PER_REQUEST = 23;

    var w = [];    // array of waypoints to return

    if (startIndex > waypoints.length - 1) { return [w, null]; } // no more waypoints to process

    var endIndex = startIndex + MAX_WAYPOINTS_PER_REQUEST;

    // adjust waypoints, because Google allows us to include the start and destination latlongs for free!
    endIndex += 2;

    if (endIndex > waypoints.length - 1) { endIndex = waypoints.length ; }

    // get the latlongs
    for (var i = startIndex; i < endIndex; i++) {
        w.push(waypoints[i]);
    }

    if (endIndex != waypoints.length) {
        return [w, endIndex -= 1];
    } else {
        return [w, null];
    }
}
