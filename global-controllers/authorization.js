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

async function ability(req, res, next) {

    const {
        rules,
        can,
        cannot
    } = AbilityBuilder.extract();

    let user = await verifyToken(req.cookies[TOKEN_COOKIE]);
    const role = user ? 'member' : 'anon';
    try {
        user = (role === 'anon') ? "anon" : await service.read(user.id);
    } catch (e) {
        return next(e);
    }
    if (role === 'anon') {
        can('create', 'users');
        can('create', 'stats');
    }
    if (role === 'member') {
        can('read', 'users');
        can('update', 'users', {
            login: user.login
        });
        can('delete', 'users', {
            login: user.login
        });
        can('manage', 'stats', {
            userId: user.id
        });
        cannot('create', 'stats');
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