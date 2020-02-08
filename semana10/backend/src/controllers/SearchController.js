const Dev = require('../models/Dev');
const parseStringsAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        //buscar tds devs num raio de 10km
        const {latitude, longitude, techs} = request.query;

        const techsArray = parseStringsAsArray(techs);

        const devs = await Dev.find({
            techs: {
                //retorna tds devs que trabalham com o que ta em techsArray $in é operador do mongodb
                $in: techsArray,
            },
            location: {
                //pega nego na distancia maxima de 10km
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    }
}