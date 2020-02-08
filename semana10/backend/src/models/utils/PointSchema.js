const mongoose = require('mongoose');

//mais um schema pra usar no banco de dados do mongoose. pega geolocalização do user
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;