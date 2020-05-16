const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('socket.io-redis');
const PORT = process.argv[2] || 3000
// io.adapter(redis({host:'localhost', port:6379}));

// io.on('connection', (socket)=>{
//     io.of('/').adapter.clients((err, clients) => {
//       console.log(clients); // an array containing all connected socket ids
//     });
//     io.emit('hi', 'just add one connected into server');
// });

app.get('/', (req, res) => {
    res.status(200).send({
        message: `Welcome to ${PORT}`});
});
http.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log('Sever now to listening at localhost:' + PORT);
    }
})