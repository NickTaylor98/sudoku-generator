'use strict';
const CrudController = require('./crud');
class StatsController extends CrudController {
    constructor(service) {
        super(service);
        this.registerRoutes();
    }
    async create(req, res) {
        req.body.userId = req.params.userId;
        super.create(req, res);
    }
    async update(req, res) {
        req.body.userId = req.params.userId;
        super.update(req, res);
    }
}

module.exports = (statsService) => {
    const controller = new StatsController(statsService);
    return controller.router;
}