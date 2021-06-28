window.Echo.channel("user-channel").listen(".UserEvent", (coords) => {
    delete coords.socket;
    markerCoords = coords;
});
