'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errors = require('./helpers/errors');
//services
const UsersService = require('./services/users');
const StatsService = require('./services/statistics');

module.exports = (db) => {
    const app = express();
    //services
    const usersService = new UsersService(
        db.users,
        errors
    );
    const statsService = new StatsService(
        db.stats,
        errors
    );

    //controllers
    const {
        sign,
        verify,
        logout
    } = require('./global-controllers/authentication')(usersService);
    const {
        ability
    } = require('./global-controllers/authorization')(usersService);

    const apiController = require('./controllers/api')(usersService, statsService);
    const errorController = require('./global-controllers/errors');
    //Mounting

    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('/logout', logout);
    app.use('/auth', sign);
    app.use(ability);
    app.use('/api', verify, apiController);
    app.use(errorController);

    return app;
};