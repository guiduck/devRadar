const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

//essa classe adiciona pro servidor que ele ouça tb o protocolo websocket

let io;
const connections = [];

//aqui eu ja crio a função e exporto
exports.setupWebsocket = (server) => {
    io = socketio(server);

    //event listenner: tda vez que alguem conectar no app vio websocket eu recebo um objeto 'scoket'
    io.on('connection', socket => {
        //recebo as querys do frontend
        const { latitude, longitude, techs } = socket.handshake.query;
        //armazeno as informações pra usar no backend e devolver os devs que tao na distancia
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};
//pega os valores armazenados e compara checando pra cada conexao as coords e se techs tao na lista
exports.findConnections = (coordinates, techs) => {
    //a some() checa se pelo menos uma, ou seja, some of them é true
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 50
            && connection.techs.some(item => techs.includes(item))
    })
}

//manda uma msg e data de cada dev cadastrado
exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}