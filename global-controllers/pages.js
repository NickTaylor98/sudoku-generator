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
    const accessToken = req.cookies[REFRESH_TOKEN];
    let verificationValue = await verifyToken(accessToken);
    if (req.path === '/index.html' || req.path == '/') {
        if (verificationValue) res.sendFile(`${BASIC_PATH}/index.html`);
        else res.redirect(`/login.html`);
    } else if (req.path === '/login.html' || req.path === '/signup.html') {
        if (verificationValue) res.redirect(`/`);
        else res.sendFile(`${BASIC_PATH}${req.path}`);
    }
}

module.exports = () => {
    return {
        redirect
    }
}