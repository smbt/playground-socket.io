const io = require('socket.io')(6001)

io.on('connection', (socket) => {
    socket.emit('chat message')
})

console.log('server running again')
