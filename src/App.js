import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { io } from 'socket.io-client';
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

function App() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
		libraries,
	});
	const [position, setPosition] = useState({});
	const [socket, setSocket] = useState();

	useEffect(() => {
		const asyncFunction = async () => {
			await setSocket(io(process.env.REACT_APP_SERVER_URI));
		};

		asyncFunction();

		return () => {
			socket.disconnect();
		};
	}, []);

	if (socket) {
		socket.on('coordinates-update', (newCoordinates) => {
			setPosition(newCoordinates);
		});
	}

	if (loadError) return 'Error al cargar, por favor reintentar';
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
					position={position}
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
