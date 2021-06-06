'use strict'

const PLACE_STORAGE = 'Locations';
let map;
var gLocations = _loadPosition();

function initMap(lat = 29.560487, lng = 34.94708) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 10,
    });
    var myLatlng = { lat, lng }
    const marker = new google.maps.Marker({
        position: myLatlng,
        map,
        title: "Click to zoom",
    });

    if (!gLocations) {
        gLocations = [];
    }
    map.addListener("click", (mapsMouseEvent) => {

        var currPos = {
            coords: mapsMouseEvent.latLng.toJSON(),
            name: prompt('please type in the name of the location'),
            id: makeId()
        }
        gLocations.push(currPos);
        _savePosition();
        renderLocations();


    });


}


function getHomePos() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser.');
        return;
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude);

    // Add a marker
    new google.maps.Marker({
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        map,
        title: 'My position',
    });
}


function renderLocations() {
    var locations = _loadPosition();
    var strHtmls = locations.map(function(location) {
        return `
      <tr>
        <td onclick="goTo(${location.coords.lat}, ${location.coords.lng})">${location.name}</td>
        <td><button class="btn btn-delete" onclick="deleteLocation('${location.id}')">Delete</button></td>
      </tr>
      `;
    });
    document.querySelector('.locations-list').innerHTML = strHtmls.join('');
}

function deleteLocation(id) {
    var locationIdx = gLocations.findIndex((location) => {
        console.log(id);
        return id === location.id;
    });

    console.log(locationIdx);
    gLocations.splice(locationIdx, 1);
    _savePosition();
    renderLocations();
}

function handleLocationError(error) {
    var locationError = document.getElementById('locationError');

    switch (error.code) {
        case 0:
            locationError.innerHTML =
                'There was an error while retrieving your location: ' + error.message;
            break;
        case 1:
            locationError.innerHTML =
                "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML =
                'The browser was unable to determine your location: ' + error.message;
            break;
        case 3:
            locationError.innerHTML =
                'The browser timed out before retrieving the location.';
            break;
    }
}

function _savePosition() {
    saveToStorage(PLACE_STORAGE, gLocations)
}

function _loadPosition() {
    var meow = loadFromStorage(PLACE_STORAGE);
    console.log(meow)
    return meow;
}