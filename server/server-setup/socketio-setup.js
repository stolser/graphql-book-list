const express = require('express');
const http = require('http');
const {Server} = require("socket.io");

function setUpSocketIo(app) {
    const socketIoPort = process.env.SOCKET_IO_PORT;
    // const app = express();
    const server = http.createServer(app);    // create the HTTP server using the Express app
    const io = new Server(server);            // connect Socket.IO to the HTTP server

    io.on('connection', () => {             // listen for new connections to Socket.IO
        console.log('A new player connected');
    });

    server.listen(socketIoPort, () => {
        console.log(`Server is up on port ${socketIoPort}.`);
    });
}

module.exports = {
    setUpSocketIo
};
