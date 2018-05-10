'use strict';
const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const config = require('./config.json');
async function verifyToken(token) {
    try {
        const user = await jwt.verifyAsync(token, config.key);
        return user;
    } catch (e) {
        return false;
    }
}
async function signToken(id, minutes) {
    const token = await jwt.signAsync({
        id: id
    }, config.key, {
        expiresIn: 60 * minutes
    });
    return token;
}

module.exports = {
    verifyToken,
    signToken
}