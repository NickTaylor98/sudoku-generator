'use strict';
const CrudController = require('./crud');
const axios = require('axios');
const {
    checkAuth
} = require('../helpers/authorization');
const defaultStats = {
    hardWins: 0,
    mediumWins: 0,
    easyWins: 0,
    hardLoses: 0,
    mediumLoses: 0,
    easyLoses: 0
};
class UsersController extends CrudController {
    constructor(service) {
        super(service);
        this.registerRoutes();
    }
    async readAll(req, res) {
        const checkValue = await checkAuth(req.ability, 'read', 'users');
        if (checkValue.access) {
            super.readAll(req, res);
        } else {
            res.status(checkValue.error.status).json(checkValue.error.message);
        }
    }
    async create(req, res) {
        const checkValue = await checkAuth(req.ability, 'create', 'users');
        let [message, status] = ["", 200];
        if (checkValue.access) {
            let data = await this.service.create(req.body);
            //let resp = await axios.post(`http://localhost:3030/api/users/${data.id}/stats`, defaultStats);
            message = data;
        } else {
            message = checkValue.error.message;
            status = checkValue.error.status;
        }
        res.status(status).json(message);
    }
    async update(req, res) {
        const user = await this.service.read(req.params.id);
        const checkValue = await checkAuth(req.ability, 'update', user);
        if (checkValue.access) {
            return super.update(req, res);
        } else {
            res.status(checkValue.error.status).json(checkValue.error.message);
        }
    }
    async delete(req, res) {
        const user = await this.service.read(req.params.id);
        const checkValue = await checkAuth(req.ability, 'delete', user);
        if (checkValue.access) {
            return super.delete(req, res);
        } else {
            res.status(checkValue.error.status).json(checkValue.error.message);
        }
    }
}
module.exports = (usersService) => {
    const controller = new UsersController(usersService);
    return controller.router;
}