const mongoose = require('mongoose');
const { registerSchema } = require('swaggiffy');

const schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now()
    }
})

registerSchema("VehicleOwner", schema, { orm: "mongoose" });

module.exports = mongoose.model('VehicleOwner', schema);