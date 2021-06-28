const markerCoords = {
    lat: -34.81293,
    lng: -58.54149,
};

function initMap(coords) {
    const center = {
        lat: -34.81293,
        lng: -58.54149,
    };
    const mapOptions = {
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        center: center,
        mapId: "95f75c8a26a4427f",
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    const marker = new google.maps.Marker({
        position: center,
        map: map,
    });

    moveMarker(map, marker);
}

const moveMarker = (map, marker) => {
    setInterval(() => {
        markerCoords.lat += 0.0001;
        markerCoords.lng += -0.0001;
        center = new google.maps.LatLng(markerCoords.lat, markerCoords.lng);
        marker.setPosition(center);
        map.panTo(center);
    }, 500);
    console.log(`coords`, markerCoords);
};
