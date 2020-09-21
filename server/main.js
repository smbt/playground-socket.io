const io = require('socket.io')(6001)

io.on('connection', (socket) => {
    console.log('connection')

    socket.on('message-from-client', (userName, message) => {
        console.log(userName, message)
        socket.broadcast.emit('message-from-server', userName, message)
    })
})
