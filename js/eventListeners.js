//Add submit listener and toggle listener
  document.getElementById('calculateRoute').addEventListener('click', function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  document.getElementById('deleteRoute').addEventListener('click', function () {
    localStorage.setItem('mustVisitPlaces', JSON.stringify([]));
  });

  document.getElementById('auto-complete-hide').addEventListener('click', function () {
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
