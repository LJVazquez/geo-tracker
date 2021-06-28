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

const flyOverAirport = async () => {
	setInterval(() => {
		io.emit('coordinates-update', flightPath[index]);
		if (index < flightPath.length) index++;
		if (index === flightPath.length) index = 0;
		console.log(`index`, index);
	}, 4000);
};

app.get('/', (req, res) => {
	res.send('funcionando');
});

io.on('connection', (socket) => {
	console.log('user connected');
	// flyOverAirport();
});

server.listen(process.env.SERVER_PORT, () => {
	console.log(`listening on port ${process.env.SERVER_PORT}`);
});
