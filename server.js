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
    const usersController = require('./controllers/users')(usersService);
    const statsController = require('./controllers/statistics')(statsService);
    const errorController = require('./global-controllers/errors');
    //Mounting
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser.json());

    app.use('/users', usersController);
    app.use('/users/:userId/stats', statsController);
    app.use(errorController);
    return app;
};