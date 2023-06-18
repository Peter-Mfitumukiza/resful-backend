const Joi = require('joi');

const validateRegisterOwner = (req, res, next) => {
    const schema = Joi.object({
        fullname: Joi.string().required(),
        nationalId: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    next();
}


module.exports = {
    validateRegisterOwner
};