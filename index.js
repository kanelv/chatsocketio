#! /usr/bin/node
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const redis = require('socket.io-redis');
var port = process.env.PORT || 3000

io.adapter(redis({ host: 'localhost', port: 6379 }));

io.on('connection', (socket) => {
    console.log('a user connected');
    // io.of('/').adapter.clients((err, clients) => {
    //   console.log(clients); // an array containing all connected socket ids
    // });  
    // io.of('/').adapter.allRooms((err, rooms) => {    
    //   console.log(rooms); // an array containing all rooms (accross every node)
    // });
    my_id = socket.id;
    console.log(my_id);
    io.of('/').adapter.remoteJoin(my_id, 'room1', err => {
        if (err) {
            console.log('nothing');
        }
        console.log('working');
    });
    // io.of('/').adapter.allRooms((err, rooms) => {    
    //   console.log(rooms); // an array containing all rooms (accross every node)
    // });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnect');
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

http.listen(process.argv[2], (err) => {
    console.log('listening on *:' + port);
});