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
    const authController = require('./global-controllers/authentication')(usersService);
   
    const apiController = require('./controllers/api')(usersService, statsService);
    const errorController = require('./global-controllers/errors');
    //Mounting

    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    
    app.use('/auth', authController.sign);
    app.use('/api', authController.verify, apiController);
    app.use(errorController);
    //app.use('/users', usersController);
    //app.use('/users/:userId/stats', statsController);

    return app;
};