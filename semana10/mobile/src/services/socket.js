import socketio from 'socket.io-client';

//ja faz a conexao com o socket
const socket = socketio('http://192.168.0.3:3333', {
    autoConnect: false,
});

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
};