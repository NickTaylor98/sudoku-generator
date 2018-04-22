'use strict';

const verify = require('../helpers/authentication');
const TOKEN_COOKIE = '__service_token';

module.exports = async (req, res, next) => {
    const token = req.cookies[TOKEN_COOKIE];
    const verificationValue = await verify(token);
    if (!verificationValue) {
        res.redirect('/login.html');
    } else {
        next();
    }
}