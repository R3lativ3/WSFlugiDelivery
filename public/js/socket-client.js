const socket = io();

const off = document.querySelector('#off')
const on = document.querySelector('#on')

const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

socket.on('connect', () => {
    console.log('conectado')
    off.style.display = 'none'
    on.style.display = ''
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