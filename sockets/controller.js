const mysql = require('mysql');

var connect = mysql.createConnection({
    host:'pideflugi.info',
    user: 'DBFlugiusr',
    password: 'Flugi.64-MySQL',
    database: 'DBSyoos_remote',
    multipleStatements:true
});

const socketController = (socket) => {
        console.log('cliente conectado', socket.id)

        socket.on('disconnect', () => {
            console.log('cliente desconectado', socket.id)
        })

        socket.on('pedidosPendientes', (idx, callback) => {
            console.log('lel')
            let id = idx
            let query = 'select a.idOrden, a.direccionEntrega, a.fechaOrden, d.latitudxx, d.longitudxx, d.zonaLocalidad, d.direccionLocalidadRestaurante, e.nombreCliente, e.telefonoCliente, a.idEstado, sum(g.cantidad * g.precio) as total '
                        +'from ordenes a, restaurantesLocalidades d, cliente e, pedidosEsperaRepartidor f, detalleOrdenes g '
                        +'where  d.idRestauranteLocalidad = a.idRestauranteLocalidad '
                        +'and e.idCliente = a.idCliente and a.idOrden = f.idOrden  and f.idRepartidor = ? and g.idOrden = a.idOrden and f.idEstadoPedidoRepartidor = 1 GROUP BY a.idOrden;'
            connect.query(query, id, (err, rows) => {
                if(err)  socket.emit('pedidosPendientes',err)
               // callback(err)
                if(rows.length === 0){
                    console.log(rows)
                    
                    socket.emit('pedidosPendientes', rows)
                    return callback(rows)
                }else{
                    console.log(rows)
                    
                     socket.emit('pedidosPendientes', rows)
                    return callback(rows)
                }
            })
        })

        socket.on('aceptarPedido', (payload, callback) => {
            console.log('llego')
            let id = payload.id
            let lat = payload.lat
            let lon = payload.lon
            let idOrden = parseInt(payload.idOrden) 

            connect.query('CALL SP_Confirmar_Pedido (?, ?, ?, ?, @output); select @output;', [id, lat, lon, idOrden], (err, rows) => {
                if(err) {
                    socket.emit('aceptarPedido', err)
                    return callback(err)
                }
                let val = rows[2][0]
                if(val['@output'] == 0){
                    socket.broadcast.emit('aceptarPedido', idOrden)
                    return callback(val)
                }
                socket.emit('aceptarPedido', rows)
                return callback(err)
            })
        })
    
}

module.exports = {
    socketController
}