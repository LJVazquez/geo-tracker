# Geo Tracker

Geo Tracker es una sencilla app para rastreo en Google Maps mediante geo coordenadas. Al utilizar socket.IO y Redis, la interfaz se actualiza en tiempo real a medida que se le suministran coordenadas via JSON mediante peticiones HTTP POST.

## Pre requisitos

La aplicacion principal requiere [PHP](https://www.php.net/), [Laravel](https://laravel.com/) y [Redis](https://redis.io/).
El simulador de envios de coordenadas requiere [Node.js](https://nodejs.org/en/)

## Configuracion

Utilizar npm en el directorio `/node` para instalar todas las dependencias necesarias.

```
npm install
```

Utilizar npm en el directorio `/laravel` para instalar las dependencias necesarias de node y composer para instalar todas las dependencias PHP.

```
npm install
composer install
```

Renombrar el archivo `.env.example` que se encuentra en `/laravel/` a `.env` y pegar tus keys de Google Maps, configurar las ubicaciones iniciales del mapa, el intervalo de tiempo en el cual se actualiza el marcador de trackeo con nuevas coordenadas y la configuracion de Redis en caso de no utilizar la por defecto.

```
GMAPS_KEY=Tu_key_de_google_maps
GMAPS_MAP_ID=Tu_ID_de_mapa_de_google_maps

MAP_CURRENT_LOCATION_REFRESH_TIME=2000
MAP_STARTING_LAT=Latitud_inicial_del_mapa_al_abrir_la_app
MAP_STARTING_LNG=Longitud_inicial_del_mapa_al_abrir_la_app

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

```

En caso de usar el simulador de envio de coordenadas, editar el archivo `.flightPath.js` que se encuentra en `/node/` colocar las coordenadas que se repetiran constantemente en loop y renombrar el archivo `.env.example` a `.env` y setear el intervalo de tiempo en el cual se envian las coordenadas a la aplicacion principal.

```
#ejemplo de coordenadas
[
    {
		lat: -34.839032,
		lng: -58.529729,
	},
	{
		lat: -34.831348,
		lng: -58.532374,
	},
	{
		lat: -34.827861,
		lng: -58.534748,
	}
]

```

```
COORDINATES_SENDING_INTERVAL=2000
```

## Deployment

Ingresar en distintas terminales los siguientes comandos en el directorio `/laravel/`

```php
 # Montar el servidor local con el proyecto
php artisan serve
```

```
# Montar el servidor echo
laravel-echo-server start
```

Ingresar en la terminal el siguiente comando en el directorio `/node/` para ejecutar el simulador de envio de coordenadas

```
npm start
```

La aplicacion se encuentra lista en `http://localhost:8000/` y recibiendo activamente coordenadas enviadas desde el simulador

![app](https://user-images.githubusercontent.com/37635454/123720850-6e5acc80-d85b-11eb-8686-30a1d27d2345.png)

## Uso manual

Para actualizar la ubicacion del marcador en el mapa sin utilizar el simulador que solo envia coordenadas pre seteadas en loop, enviar una solicitud HTTP POST al endpoint `http://localhost:8000/send-coords` enviando un JSON con los datos de longitud y latitud.

![solicitud](https://user-images.githubusercontent.com/37635454/123721445-bdedc800-d85c-11eb-913d-b3d389b9d200.png)

Se recibira una confirmacion de que se recibieron correctamente.

![confirmacion](https://user-images.githubusercontent.com/37635454/123721566-00afa000-d85d-11eb-9a45-d3073dd4ddec.png)

> :bulb: Al utilizar socket.IO en conjunto con Redis para recibir los datos de coordenadas, el rastreador se actualiza en tiempo real
> ![tracker](https://user-images.githubusercontent.com/37635454/123721952-c1ce1a00-d85d-11eb-8523-aa153386de09.png)

## Licencia

Este es un proyecto personal y esta licenciado bajo la licencia MIT - Ver el archivo [LICENSE.txt](LICENSE.txt) para mas detalles.
