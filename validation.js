const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).max(1000).required(),
        email: Joi.string().max(300).required().email(),
        password: Joi.string().max(1000).min(10).required()
    };
    return Joi.validate(data, schema);
}

// Login Validation
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().max(300).required().email(),
        password: Joi.string().max(1000).min(10).required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;