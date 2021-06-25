import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapOptionsStyles from './mapOptionsStyles';
import './App.css';

const libraries = ['places'];
const mapContainerStyle = { width: '100vw', height: '100vh' };
const center = {
	lat: -34.81293,
	lng: -58.54149,
};
const options = {
	styles: mapOptionsStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

const ezeiza = {
	lat: -34.81293,
	lng: -58.54149,
};

function App() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
		libraries,
	});

	if (loadError) return 'Error cargando el mapa, por favor reintentar';
	if (!isLoaded) return 'Cargando mapa...';

	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={center}
				zoom={12}
				options={options}
			>
				<Marker position={ezeiza} />
			</GoogleMap>
		</div>
	);
}

export default App;
