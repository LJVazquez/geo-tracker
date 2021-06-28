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
		console.log(`flightPath[index]`, flightPath[index]);
		if (index < flightPath.length) index++;
		if (index === flightPath.length) index = 0;
		console.log(`index`, index);
	}, 4000);
};

flyOverAirport();

app.get('/', (req, res) => {
	res.send('funcionando');
});

server.listen(process.env.SERVER_PORT, () => {
	console.log(`server activo en puerto ${process.env.SERVER_PORT}`);
});
