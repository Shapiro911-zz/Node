const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');
//npm start
const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

io.on('connection', client => {
    const count = io.engine.clientsCount;
    console.log(count);
    let username = ' ';
    client.on('setUsername', (data) => {
        username = data.user;
        if (!data.connection) {
            const payload = {
                user: username,
                status: 'connected',
            };
            client.emit('serverAnnoucement', payload);
            client.broadcast.emit('serverAnnoucement', payload);
        }
        else {
            const payload = {
                user: username,
                status: 'reconnected',
            };
            client.emit('serverAnnoucement', payload);
            client.broadcast.emit('serverAnnoucement', payload);
        }
    });

    client.on('client-msg', (data) => {
        const payload = {
            author: username,
            message: data.message.split('').reverse().join(''),
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
    client.on('disconnect', () => {
        const payload = {
            user: username,
            status: 'disconnected',
        };
        client.broadcast.emit('serverAnnoucement', payload);
    });
});

server.listen(5555);
