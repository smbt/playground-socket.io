const io = require('socket.io')(6001)

io.on('connection', (socket) => {
    socket.on('join', (userName) => {
        io.emit('user-joined', userName)
    })

    socket.on('message-from-user', (userName, message) => {
        socket.broadcast.emit('message-from-server', userName, message)
    })

    socket.on('leave', (userName) => {
        console.log('leave')
        io.emit('user-left', userName)
    })
})
