require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
	cors: 'http://localhost:3000',
	methods: ['GET', 'POST'],
});

const flightPath = require('./flightPath');
let index = 0;

const flyOverAirport = () => {
	io.emit('coordinates-update', flightPath[index]);
	if (index < flightPath.length) index++;
	if (index === flightPath.length) index = 0;
};

function setTimeoutLoop(callback, interval, times) {
	for (var i = 0; i < times; i++) {
		setTimeout(callback, i * interval);
	}
}

app.get('/', (req, res) => {
	res.send('funcionando');
});

io.on('connection', (socket) => {
	console.log('user connected');
	socket.on('fly-in-circles', (times) => {
		setTimeoutLoop(flyOverAirport, 2000, flightPath.length * times);
	});
});

server.listen(process.env.SERVER_PORT, () => {
	console.log(`listening on port ${process.env.SERVER_PORT}`);
});
