const Joi = require('joi');

const validateRegisterVehicle = (req, res, next) => {
    const schema = Joi.object({
        chasisNumber: Joi.string().required(),
        manufacturer: Joi.string().required(),
        manufactureYear: Joi.number().required(),
        price: Joi.number().required(),
        plateNumber: Joi.string().required(),
        modelName: Joi.string().required(),
        ownerNationalId: Joi.string().required()
    })
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({status: "error", message: error.details[0]});
    }
    next();
}

module.exports = {
    validateRegisterVehicle
}