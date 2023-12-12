const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
console.log('A user has logged in');

  // Escuchar cuando un usuario envía un mensaje
socket.on('chat message', (message) => {
    // Reenviar el mensaje a todos los usuarios conectados
    io.emit('chat message', message);
});

  // Escuchar cuando un usuario se desconecta
socket.on('disconnect', () => {
    console.log('A user has been disconnected');
});
});

server.listen(3000, () => {
console.log('Chat server listening on port 3000');
});

