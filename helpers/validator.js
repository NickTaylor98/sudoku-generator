const Joi = require('joi');
const user = {
    login: Joi.string(),
    password: Joi.string()
};
const stat = {
    hardWins: Joi.number().positive(),
    hardLoses: Joi.number().positive(),
    mediumWins: Joi.number().positive(),
    mediumLoses: Joi.number().positive(),
    easyWins: Joi.number().positive(),
    easyLoses: Joi.number().positive()
}
const schemas = {
    'user': Joi.object().keys(user),
    'stat': Joi.object().keys(stat),
}

exports.check = (schema, body) => {
    if (!schemas[schema])
        return {};
    return Joi.validate(body, schemas[schema], {
        presence: 'required'
    });
}