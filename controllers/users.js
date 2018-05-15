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

    /**
     * @api {get} /users List all users
     * @apiGroup Users
     * @apiSuccess {Object[]} users User's list
     * @apiSuccess {Number} users.id User id
     * @apiSuccess {String} users.login User login
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "id": 1,
     *      "login": "user1"
     *    },
     *    {
     *      "id": 2,
     *      "login": "user2"
     *    }]
     *      
     */
    async readAll(req, res) {
        const checkValue = await checkAuth(req.ability, 'read', 'users');
        if (checkValue.access) {
            return super.readAll(req, res);
        } else {
            res.status(checkValue.error.status).json(checkValue.error.message);
        }
    }
    /**
     * @api {get} /users/:userID List one user
     * @apiGroup Users
     * @apiParam {userID} id User identifier
     * @apiSuccess {Number} users.id User id
     * @apiSuccess {String} users.login User login
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "login": "user1"
     *    }
     *      
     */
    async read(req, res) {
        return super.read(req, res);
    }
    /**
     * @api {post} /users Create new user
     * @apiGroup Users
     * @apiParam {login} login User login
     * @apiParam {password} password User password
     * @apiSuccess {Number} id User id
     * @apiSuccess {String} login User login
     * @apiSuccess {String} password User password
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "login": "user1",
     *      "password": "2%2svjkfwhvkwjvbjwhsvhjsdfgvkjshdg"
     *    }
     *      
     */
    async create(req, res) {
        const checkValue = await checkAuth(req.ability, 'create', 'users');
        let [message, status] = ["", 200];
        if (checkValue.access) {
            let data = await this.service.create(req.body);
            let resp = await axios.post(`http://localhost:${req.connection.localPort}/api/users/${data.id}/stats`, defaultStats);
            message = data;
        } else {
            message = checkValue.error.message;
            status = checkValue.error.status;
        }
        res.status(status).json(message);
    }

    /**
     * @api {put} /users/:userID Update user
     * @apiGroup Users
     * @apiParam {userID} id User identifier
     * @apiParam {login} login User login
     * @apiParam {password} password User password
     * @apiSuccess {Number} id User id
     * @apiSuccess {String} login User login
     * @apiSuccess {String} password User password
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "login": "user2",
     *      "password": "2%2svjkfwhvkwjvbjwhsvhjsdfgvkjshdg"
     *    }
     *      
     */
    async update(req, res) {
        const user = await this.service.read(req.params.id);
        const checkValue = await checkAuth(req.ability, 'update', user);
        if (checkValue.access) {
            return super.update(req, res);
        } else {
            res.status(checkValue.error.status).json(checkValue.error.message);
        }
    }
    /**
     * @api {delete} /users/:userID Delete user
     * @apiGroup Users
     * @apiParam {userID} id User identifier
     * @apiSuccess {Number} success Success value
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    1 
     */
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