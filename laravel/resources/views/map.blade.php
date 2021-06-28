<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    * {
        margin: 0;
        padding: 0
    }

    #map {
        height: 100vh;
        width: 100%;
    }

    #coords {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
        padding: 1rem;
        background-color: rgba(61, 64, 67, 0.5);
        border-radius: 5px;
        color: #FFF;
        font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
    }

    #coords h1 {
        font-size: 1.5rem;
        margin: 0;
    }

</style>

<body>
    <div id="coords">
        <h1>Posicion actual</h1>
        <p>Latitud: <span id="lat">{{ env('MAP_STARTING_LAT') ? env('MAP_STARTING_LAT') : '0' }} </span></p>
        <p>Longitud: <span id="lng">{{ env('MAP_STARTING_LNG') ? env('MAP_STARTING_LNG') : '0' }}</span></p>
    </div>
    <div id="map"></div>

    <script>
        let markerCoords = {
            lat: {{ env('MAP_STARTING_LAT') ? env('MAP_STARTING_LAT') : 0 }},
            lng: {{ env('MAP_STARTING_LNG') ? env('MAP_STARTING_LNG') : 0 }}
        };

        function initMap() {
            const mapOptions = {
                zoom: 14,
                disableDefaultUI: true,
                zoomControl: true,
                center: markerCoords,
                mapId: "{{ env('GMAPS_MAP_ID') }}",
            };

            const map = new google.maps.Map(document.getElementById("map"), mapOptions);

            const marker = new google.maps.Marker({
                position: markerCoords,
                map: map,
                icon: "{{ asset('img/plane.png') }}",
            });

            const latText = document.querySelector("span#lat");
            const lngText = document.querySelector("span#lng");

            setInterval(() => {
                let newCoords = new google.maps.LatLng(
                    markerCoords.lat,
                    markerCoords.lng
                );
                marker.setPosition(newCoords);
                map.panTo(newCoords);

                latText.innerText = markerCoords.lat;
                lngText.innerText = markerCoords.lng;

                console.log(`coords`, markerCoords);
            }, {{ env('MAP_CURRENT_LOCATION_REFRESH_TIME') }});
        }
    </script>

    <script src="https://maps.googleapis.com/maps/api/js?key={{ env('GMAPS_KEY') }}&callback=initMap&libraries=&v=weekly"
        async>
    </script>
    <script>
        window.laravel_echo_port = '{{ env('LARAVEL_ECHO_PORT') }}';
    </script>
    <script src="//{{ Request::getHost() }}:{{ env('LARAVEL_ECHO_PORT') }}/socket.io/socket.io.js"></script>
    <script src="{{ url('/js/laravel-echo-setup.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/receive-event.js') }}"></script>



</body>

</html>
