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
	const [position, setPosition] = useState({
		lat: -34.839045,
		lng: -58.525447,
	});
	const [socket, setSocket] = useState();

	useEffect(() => {
		setSocket(io(process.env.REACT_APP_SERVER_URI));

		return () => {
			socket.disconnect();
		};
	}, []);

	const sendPlane = () => {
		socket.emit('fly-in-circles', 1);
		socket.on('coordinates-update', (newCoordinates) => {
			console.log(`newCoordinates`, newCoordinates);
			setPosition(newCoordinates);
		});
	};

	if (loadError) return 'Error al cargar, por favor reintentar';
	if (!isLoaded) return <div className="spinner"></div>;

	return (
		<div>
			<button onClick={sendPlane}>Sobrevolar aeropuerto</button>
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
