'use strict';
const CrudController = require('./crud');
class StatsController extends CrudController {
    constructor(service) {
        super(service);
        this.registerRoutes();
    }
    async readAll(req, res) {
        req.query.userId = req.params.userId;
        return super.readAll(req, res);
    }
    async create(req, res) {
        req.body.userId = req.params.userId;
        return super.create(req, res);
    }
    async update(req, res) {
        req.body.userId = req.params.userId;
        return super.update(req, res);
    }
}

module.exports = (statsService) => {
    const controller = new StatsController(statsService);
    return controller.router;
}