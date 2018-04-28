'use strict';

const {
    verifyToken,
    signToken
} = require('../helpers/authentication');
const bcrypt = require('bcryptjs');
const TOKEN_COOKIE = '__service_token';

let service;

async function verify(req, res, next) {
    if (req.method.toLowerCase() === 'post') return next();
    const token = req.cookies[TOKEN_COOKIE];
    const verificationValue = await verifyToken(token);
    if (!verificationValue) {
        res.redirect(`/login.html?callback=${req.originalUrl}`);
    } else {
        req.userId = verificationValue.id;
        next();
    }
}
async function sign(req, res, next) {
    try {
        const user = await service.readByLogin(req.body.login);
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            throw service.errors.unauthorized;
        } else {
            const token = await signToken(user.id);
            res.cookie(TOKEN_COOKIE, token);
            res.redirect(req.body.callback);
        }
    } catch (e) {
        return next(e);
    }
}

module.exports = (userService) => {
    service = userService;
    return {
        verify,
        sign
    };
}