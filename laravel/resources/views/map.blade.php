<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    #map {
        height: 500px;
        width: 100%;
    }

</style>

<body>
    <div id="map"></div>
    <script src="{{ asset('js/map.js') }}"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key={{ env('GMAPS_KEY') }}&callback=initMap&libraries=&v=weekly"
        async>
    </script>
    <script>
        window.laravel_echo_port = '{{ env('LARAVEL_ECHO_PORT') }}';
    </script>
    <script src="//{{ Request::getHost() }}:{{ env('LARAVEL_ECHO_PORT') }}/socket.io/socket.io.js"></script>
    <script src="{{ url('/js/laravel-echo-setup.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/receive-event.js') }}"></script>

    <script type="text/javascript">

    </script>


</body>

</html>
