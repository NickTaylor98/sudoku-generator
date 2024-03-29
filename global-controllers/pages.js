'use strict';
const {
    verifyToken,
    signToken
} = require('../helpers/authentication');
const path = require('path');
const ACCESS_TOKEN = '__service_token';
const REFRESH_TOKEN = '__refresh_token';
const BASIC_PATH = path.resolve(__dirname, `../public/html/`);

async function redirect(req, res, next) {
    let accessToken = req.cookies[ACCESS_TOKEN];
    const refreshToken = req.cookies[REFRESH_TOKEN];
    let verificationValue = await verifyToken(accessToken);
    if (!verificationValue) {
        verificationValue = await verifyToken(refreshToken);
        if (!verificationValue) {
            if (req.path === '/login.html' || req.path === '/signup.html') {
                res.sendFile(`${BASIC_PATH}${req.path}`);
            } else res.redirect(`/login.html`);
        } else {
            accessToken = await signToken(verificationValue.id, 30);
            res.cookie(ACCESS_TOKEN, accessToken);
            res.redirect('/');
        }
    } else {
        if (req.path === '/index.html' || req.path === '/')
            res.sendFile(`${BASIC_PATH}/index.html`);
        else res.redirect('/');
    }
}

module.exports = () => {
    return {
        redirect
    }
}