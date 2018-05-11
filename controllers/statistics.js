'use strict';
const CrudController = require('./crud');
const {
    checkAuth
} = require('../helpers/authorization');
class StatsController extends CrudController {
    constructor(service) {
        super(service);
        this.routes = {
            '/': [{
                    method: 'post',
                    cb: this.create
                },
                {
                    method: 'get',
                    cb: this.read
                },
                {
                    method: 'put',
                    cb: this.update
                },
                {
                    method: 'delete',
                    cb: this.delete
                }
            ]
        };
        this.registerRoutes();
    }
    async read(req, res) {
        req.params.id = req.params.userId;
        const checkValue = await checkAuth(req.ability, 'read', 'stats');
        return checkValue.access ? super.read(req, res) : checkValue.error.message;
    }
    async create(req, res) {
        req.body.userId = req.params.userId;
        const checkValue = await checkAuth(req.ability, 'create', 'stats');
        return super.create(req, res);
    }
    async update(req, res) {
        req.body.userId = req.params.userId;
        const stat = await this.service.read(req.params.id);
        const checkValue = await checkAuth(req.ability, 'update', stat);
        return super.update(req, res);
    }
}

module.exports = (statsService) => {
    const controller = new StatsController(statsService);
    return controller.router;
}