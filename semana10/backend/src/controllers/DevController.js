const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

//controller normalmente tem funções index, show, store, update, destroy

module.exports = { 
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    //tem que por flag async pra falar que a função pode demorar responer
    async store(request, response)  {
        const { github_username, techs, latitude, longitude } = request.body;

        //procura de o dev ja ta cadsatrado baseado no username
        let dev = await Dev.findOne({ github_username });

        if (!dev) {            
            //tem que por o await pra esperar finlizar o api do github e continuar o codigo
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);//quando usa crase, da pra por variavel na string
            
            const { name = login, avatar_url, bio } = apiResponse.data;        
            //array pra dividir 1 string em varias e percorre cada tech e tira os espaços em branco
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }     
            //cria o usuario pra armazear os dados. n precisa passar valor quando nome é igual
            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            //filtrar conexoes pela distancia e techs que vem do socket
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json({dev});
    },

    /*
    async update(request, response) {
        //atualiza dev
        const {name, bio, techs, longitude, latitude} = request.body;
    },

    async desroy(request, response) {
        //deleta o dev
    }
    */
}