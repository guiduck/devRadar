const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const http = require('http');
const { setupWebsocket } = require('./websocket');

const app = express();
//pegar as requisições de http post/get... do app para trabalhar com o servidor fora do app
const server = http.Server(app);
setupWebsocket(server); 

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ziowr.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//passa pro express entender requisições com formato json p/ tdas as rotas
//com .use() é p/ todas as rotas, com .get é só rotas com get
app.use(cors());
app.use(express.json());
app.use(routes);
//mongodb(banco de dados não-relacional)

//principais metodos http: get, post, put, delete
/*  tipos de parametros:
    Querry Params: req.querry (usados p/ filtors, ordenação, paginação, ...)
    Route Params: request.params (identificar recurso na alteração ou remoção)
    Body: request.body(Dados para a criação ou alteração de um registro-em json se for restful) 
*/
server.listen(3333);