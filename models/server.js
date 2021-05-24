const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app )
        this.io = require('socket.io')( this.server )
        this.paths = {}
    
        this.middlewares();
        this.routes();

        this.sockets();

    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.static('public'));
    }

    routes(){

    }

    sockets(){
        this.io.on('connection', socket => {
            console.log('cliente conectado', socket.id)

            socket.on('disconnect', () => {
                console.log('cliente desconectado', socket.id)
            })

            socket.on('enviar-mensaje', ( payload ) => {
                console.log(payload)
            })
        })
    }

    listen(){
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }


}

module.exports = Server