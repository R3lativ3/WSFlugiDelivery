const socket = io();

const off = document.querySelector('#off')
const on = document.querySelector('#on')

const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')
const btnEnviar2 = document.querySelector('#btnEnviar2')

socket.on('connect', () => {
    console.log('conectado')
    off.style.display = 'none'
    on.style.display = ''
})

socket.on('aceptarPedido', (x) => {
    console.log('escuchando')
    console.log(x)
})

socket.on('disconnect', () => {
    console.log('desconectado')
    on.style.display = 'none'
    off.style.display = ''
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value

    const payload = {
        mensaje, 
        id: 'sakda',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload)
})

btnEnviar2.addEventListener('click', () => {


    const payload = {
        id: 7, 
        lat: "3.45454",
        lon: "4.54545",
        idOrden:154
    }
    socket.emit('aceptarPedido', payload, (x) => {
        console.log(x)
    })
})