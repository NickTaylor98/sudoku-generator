'use strict';

const {
    verifyToken,
    signToken
} = require('../helpers/authentication');
const bcrypt = require('bcryptjs');
const TOKEN_COOKIE = '__service_token';

let service;

async function verify(req, res, next) {
    if (req.originalUrl === '/api/users' && req.method.toLowerCase() === 'post') return next();
    const token = req.cookies[TOKEN_COOKIE];
    const verificationValue = await verifyToken(token);
    if (!verificationValue) {
        res.redirect(`/login.html?callback=${req.originalUrl}`);
    } else {
        next();
    }
}
async function sign(req, res, next) {
    const user = await service.readByLogin(req.body.login);
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        return res.status(403).json("Unauthorized");
    } else {
        const token = await signToken(user.id);
        res.cookie(TOKEN_COOKIE, token);
        res.redirect(req.body.callback);
    }
}

module.exports = (userService) => {
    service = userService;
    return {
        verify,
        sign
    };
}