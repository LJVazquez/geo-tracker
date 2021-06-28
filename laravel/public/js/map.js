let markerCoords = { lat: 0, lng: 0 };

function initMap() {
    const center = {
        lat: -34.81293,
        lng: -58.54149,
    };
    const mapOptions = {
        zoom: 14,
        disableDefaultUI: true,
        zoomControl: true,
        center: center,
        mapId: "95f75c8a26a4427f",
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const marker = new google.maps.Marker({
        position: markerCoords,
        map: map,
        icon: "../img/plane.png",
    });

    setInterval(() => {
        let newCoords = new google.maps.LatLng(
            markerCoords.lat,
            markerCoords.lng
        );
        marker.setPosition(newCoords);
        map.panTo(newCoords);

        console.log(`coords`, markerCoords);
    }, 2000);
}
