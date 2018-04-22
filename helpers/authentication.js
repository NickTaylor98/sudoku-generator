'use strict';
const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
module.exports = async (token) => {
    try {
        const user = await jwt.verifyAsync(token, 'nikita');
        return user;
    } catch (e) {
        return false;
    }
}