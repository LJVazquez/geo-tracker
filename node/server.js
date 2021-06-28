const axios = require('axios');
var http = require('http');
const flightPath = require('./flightPath');

let index = 0;

const flyOverAirport = () => {
	setInterval(() => {
		sendCoordinates(flightPath[index]);
		if (index < flightPath.length) index++;
		if (index === flightPath.length) index = 0;
	}, 4000);
};

const sendCoordinates = (coords) => {
	axios
		.post('http://localhost:8000/send-coords', coords)
		.then(function (res) {
			console.log(res.data);
		})
		.catch(function (e) {
			console.log(e);
		});
};

flyOverAirport();

http
	.createServer(function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Server funcionando en http://127.0.0.1:3000/');
	})
	.listen(3000);

console.log('Server funcionando en http://127.0.0.1:3000/');
