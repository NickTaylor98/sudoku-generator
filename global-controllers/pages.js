'use strict';
const {
    verifyToken,
    signToken
} = require('../helpers/authentication');
const path = require('path');
const ACCESS_TOKEN = '__service_token';

const BASIC_PATH = path.resolve(__dirname, `../public/html/`);

async function redirect(req, res, next) {
    const accessToken = req.cookies[ACCESS_TOKEN];
    let verificationValue = await verifyToken(accessToken);
    if (req.path === '/index.html' || req.path == '/') {
        if (verificationValue) res.sendFile(`${BASIC_PATH}/index.html`);
        else res.redirect(`/login.html`);
    } else if (req.path === '/login.html') {
        if (verificationValue) res.redirect(`/`);
        else res.sendFile(`${BASIC_PATH}/login.html`);
    } else if (req.path === '/signup.html') {
        if (verificationValue) res.redirect(`/`);
        else res.sendFile(`${BASIC_PATH}/signup.html`);
    }
}

module.exports = () => {
    return {
        redirect
    }
}