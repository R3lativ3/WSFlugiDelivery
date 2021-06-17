
const socketController = (socket) => {
        console.log('cliente conectado', socket.id)

        socket.on('disconnect', () => {
            console.log('cliente desconectado', socket.id)
        })


        socket.on('pedidosAceptados', (payload, callback) => {
            let idOrden = parseInt(payload) 

            socket.broadcast.emit('pedidosAceptados', idOrden)
            return callback(idOrden)
                
        }) 

        
        socket.on('notificarRepartidor', (payload, callback) => {
            let idOrden = parseInt(payload) 

            socket.broadcast.emit('notificarRepartidor', idOrden)
            return callback(idOrden)
                
        }) 
}

module.exports = {
    socketController
}