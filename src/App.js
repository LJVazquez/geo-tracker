import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapOptionsStyles from './mapOptionsStyles';
import planePath from './planePath';
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
	if (!isLoaded) return <div className="spinner"></div>;

	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={center}
				zoom={12}
				options={options}
			>
				<Marker
					position={ezeiza}
					icon={{
						path: planePath,
						scale: 0.08,
						strokeColor: 'gold',
						strokeWeight: 1,
					}}
				/>
			</GoogleMap>
		</div>
	);
}

export default App;
