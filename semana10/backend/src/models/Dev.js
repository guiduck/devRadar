const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

//cria o model aqui e depois criar uma rota pra mecher com o model
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url:String,
    techs: [String],
    //criar classe da pointschema pra se for usar serviço de geolocation de novo
    location: {
        type: PointSchema,
        //pra receber x e y
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema);