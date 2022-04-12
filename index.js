const app = require('./app');
//const db  = require('./database/conexion');

const http = require('http');

const PORT = process.env.PORT || '3000';

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', (client) => {

    console.log("Hola se conecto ", client.id);

    
    //client.on('event', data => { console.log(data); });
    client.on('disconnect', () => { console.log('Se desconecto'); });
   
    client.on('actionSendMsg', (data) => {
        console.log(data)
    })
});

app.set('port', PORT);

server.listen(PORT);

console.log("Server UP at " + PORT + " port");

