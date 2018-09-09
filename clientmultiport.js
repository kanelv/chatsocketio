var io = require('socket.io-client')(process.argv[2]);

io.on('connect', (socket) => {
    io.on('hi', (data)=>{
        console.log(data)
    })    
});
