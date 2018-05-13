const express = require('express');
module.exports = (
    usersService,
    statsService
) => {
    const router = express.Router();

    const usersController = require('./users')(usersService);
    const statsController = require('./statistics')(statsService);

    router.use('/users', usersController);
    router.get('/stats', async (req, res, next) => {
        const data = await statsService.readChunk();
        res.json(data);
    });
    router.use('/users/:userId/stats', statsController);
    return router;
};