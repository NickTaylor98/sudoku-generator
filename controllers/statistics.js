'use strict';
const CrudController = require('./crud');
const {
    checkAuth
} = require('../helpers/authorization');
class StatsController extends CrudController {
    constructor(service) {
        super(service);
        this.registerRoutes();
    }
    async readAll(req, res) {
        req.query.userId = req.params.userId;
        const checkValue = await checkAuth(req.ability, 'read', 'stats');
        return checkValue.access ? super.readAll(req, res) : checkValue.error.message;
    }
    async create(req, res) {
        req.body.userId = req.params.userId;
        const checkValue = await checkAuth(req.ability, 'create', 'stats');
        return super.create(req, res);
    }
    async update(req, res) {
        req.body.userId = req.params.userId;
        const stat = this.service.read(req.params.id);
        const checkValue = await checkAuth(req.ability, 'update', stat);
        return super.update(req, res);
    }
}

module.exports = (statsService) => {
    const controller = new StatsController(statsService);
    return controller.router;
}