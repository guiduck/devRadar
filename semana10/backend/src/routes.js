//pra usar apenas uma coisa do express, pode usar entre chaves sem importar o express por inteiro
const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

//em routes tem tds metodos do objeto tipo express/ criei objeto de 'tipo' rotas
const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/Search', SearchController.index);

//exportar as rotas daqui pra aplicação reconnhecer rotas
module.exports = routes;