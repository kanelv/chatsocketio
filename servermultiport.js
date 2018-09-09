var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('socket.io-redis');
io.adapter(redis({host:'localhost', port:6379}));

io.on('connection', (socket)=>{
    io.of('/').adapter.clients((err, clients) => {
      console.log(clients); // an array containing all connected socket ids
    });
    io.emit('hi', 'just add one connected into server');
});
http.listen(process.argv[2], (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log('Sever now to listening at localhost:' + process.argv[2]);
    }
})