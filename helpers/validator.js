'use strict';
const Joi = require('joi');
const user = {
    login: Joi.string(),
    password: Joi.string()
};
const stat = {
    hardWins: Joi.number().min(0),
    hardLoses: Joi.number().min(0),
    mediumWins: Joi.number().min(0),
    mediumLoses: Joi.number().min(0),
    easyWins: Joi.number().min(0),
    easyLoses: Joi.number().min(0),
    userId : Joi.number().min(0)
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