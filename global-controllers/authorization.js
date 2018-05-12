'use strict';
const {
    AbilityBuilder,
    Ability
} = require('casl');
const {
    verifyToken
} = require('../helpers/authentication');
let service;

const TOKEN_COOKIE = '__service_token';
const REFRESH_COOKIE = '__refresh_token';

async function ability(req, res, next) {

    const {
        rules,
        can,
        cannot
    } = AbilityBuilder.extract();

    let user = await verifyToken(req.cookies[TOKEN_COOKIE]);
    let role = user ? 'member' : 'anon';
    try {
        user = (role === 'anon') ? "anon" : await service.read(user.id);
    } catch (e) {
        req.cookies[TOKEN_COOKIE] = "";
        req.cookies[REFRESH_COOKIE] = "";
        role = 'anon';
    } finally {
        if (role === 'anon') {
            can('create', 'users');
            can('create', 'statistics');
        }
        if (role === 'member') {
            can('read', 'users');
            can('update', 'users', {
                login: user.login
            });
            can('delete', 'users', {
                login: user.login
            });
            can('read', 'statistics');
            can('update', 'statistics', {
                userId: user.id
            });
            can('delete', 'statistics', {
                userId: user.id
            });
        }
    }
    req.ability = new Ability(rules);
    next();
};

module.exports = (userService) => {
    service = userService;
    return {
        ability
    };
}