const express = require('express');
module.exports = (
    usersService,
    statsService
) => {
    const router = express.Router();

    const usersController = require('./users')(usersService);
    const statsController = require('./statistics')(statsService);

    router.use('/users', usersController);
    router.use('/users/:userId/stats', statsController);
    return router;
};