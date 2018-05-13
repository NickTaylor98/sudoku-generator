'use strict';

const {
    verifyToken,
    signToken
} = require('../helpers/authentication');
const bcrypt = require('bcryptjs');
const ACCESS_TOKEN = '__service_token';
const REFRESH_TOKEN = '__refresh_token';
let service;

async function verify(req, res, next) {
    if (req.method.toLowerCase() === 'post') return next();
    let accessToken = req.cookies[ACCESS_TOKEN];
    const refreshToken = req.cookies[REFRESH_TOKEN];
    let verificationValue = await verifyToken(accessToken);
    if (!verificationValue) {
        verificationValue = await verifyToken(refreshToken);
        if (!verificationValue) {
            res.redirect(`/login.html?callback=${req.originalUrl}`);
        } else {
            accessToken = await signToken(verificationValue.id, 30);
            res.cookie(ACCESS_TOKEN, accessToken);
            next();
        }
    } else {
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
            const accessToken = await signToken(user.id, 30);
            const refreshToken = await signToken(user.id, 60 * 24 * 10); //10 days
            res.cookie(ACCESS_TOKEN, accessToken);
            res.cookie(REFRESH_TOKEN, refreshToken);
            //res.redirect(req.body.callback || '/');
            res.json({
                redirect: (req.body.callback || '/')
            });
        }
    } catch (e) {
        return next(e);
    }
}

async function logout(req, res, next) {
    res.cookie(ACCESS_TOKEN, "");
    res.cookie(REFRESH_TOKEN, "");
    res.redirect("/login.html");
}

module.exports = (userService) => {
    service = userService;
    return {
        verify,
        sign,
        logout
    };
}