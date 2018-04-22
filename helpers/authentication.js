'use strict';
const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const config = require('./config.json');
async function verify(token) {
    try {
        const user = await jwt.verifyAsync(token, config.key);
        return user;
    } catch (e) {
        return false;
    }
}
async function sign(id) {
    const token = await jwt.signAsync({
        id: id
    }, config.key, {
        expiresIn: 60 * 30
    });
    return token;
}
module.exports = {
    verify,
    sign
}