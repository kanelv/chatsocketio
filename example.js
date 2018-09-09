const io = require('socket.io')(3000);
const redis = require('socket.io-redis');

io.adapter(redis({host:'localhost', port:6379}));
io.of('/').adapter.clients((err, clients) => {
    console.log(clients); // an array containing all connected socket ids
});
console.log(io.port)
