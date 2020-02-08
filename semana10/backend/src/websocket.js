const socketio = require('socket.io');
//essa classe adiciona pro servidor que ele ouça tb o protocolo websocket

//aqui eu ja crio a função e exporto
exports.setupWebsocket = (server) => {
    const io = socketio(server);

    //event listenner: tda vez que alguem conectar no app vio websocket eu recebo um objeto 'scoket'
    io.on('connection', socket => {
        console.log(socket.id);
    });
};