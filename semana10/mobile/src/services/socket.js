import socketio from 'socket.io-client';

//ja faz a conexao com o socket
const socket = socketio('http://192.168.0.3:3333', {
    autoConnect: false,
});

//ouve evento 'new-dev' que dispara quando dev é cadastrado no backend e dispara subscribeFunciton
function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction); 
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };
    
    socket.connect();

}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
};