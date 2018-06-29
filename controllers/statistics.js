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

    /**
     * @api {get} /users/:userID/stats List user statistic
     * @apiGroup Stats
     * @apiParam {Number} id User identifier
     * @apiSuccess {Number} stats.id Stats id
     * @apiSuccess {Number} stats.hardWins Quantity of wins hard level sudoku
     * @apiSuccess {Number} stats.mediumWins Quantity of wins medium level sudoku
     * @apiSuccess {Number} stats.easyWins Quantity of wins easy level sudoku
     * @apiSuccess {Number} stats.hardLoses Quantity of loses hard level sudoku
     * @apiSuccess {Number} stats.mediumLoses Quantity of loses medium level sudoku
     * @apiSuccess {Number} stats.easyLoses Quantity of loses easy level sudoku
     * @apiSuccess {Number} stats.userId User Id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id":1,
     *      "hardWins":0,
     *      "hardLoses":0,
     *      "mediumWins":0,
     *      "mediumLoses":0,
     *      "easyWins":1,
     *      "easyLoses":2,
     *      "userId":1
     *    }  
     */
    async read(req, res) {
        req.params.id = req.params.userId;
        const checkValue = await checkAuth(req.ability, 'read', 'statistics');
        return checkValue.access ? super.read(req, res) : checkValue.error.message;
    }
    /**
     * @api {post} /users/:userID/stats Create user statistic
     * @apiGroup Stats
     * @apiParam {Number} userID id User identifier
     * @apiParam {Number} hardWins Quantity of wins hard level sudoku
     * @apiParam {Number} mediumWins Quantity of wins medium level sudoku
     * @apiParam {Number} easyWins Quantity of wins easy level sudoku
     * @apiParam {Number} hardLoses Quantity of loses hard level sudoku
     * @apiParam {Number} mediumLoses Quantity of loses medium level sudoku
     * @apiParam {Number} easyLoses Quantity of loses easy level sudoku
     * @apiSuccess {Number} stats.id Stats id
     * @apiSuccess {Number} stats.hardWins Quantity of wins hard level sudoku
     * @apiSuccess {Number} stats.mediumWins Quantity of wins medium level sudoku
     * @apiSuccess {Number} stats.easyWins Quantity of wins easy level sudoku
     * @apiSuccess {Number} stats.hardLoses Quantity of loses hard level sudoku
     * @apiSuccess {Number} stats.mediumLoses Quantity of loses medium level sudoku
     * @apiSuccess {Number} stats.easyLoses Quantity of loses easy level sudoku
     * @apiSuccess {Number} stats.userId User Id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id":1,
     *      "hardWins":0,
     *      "hardLoses":0,
     *      "mediumWins":0,
     *      "mediumLoses":0,
     *      "easyWins":1,
     *      "easyLoses":2,
     *      "userId":1
     *    }  
     */
    async create(req, res) {
        req.body.userId = req.params.userId;
        const checkValue = await checkAuth(req.ability, 'create', 'statistics');
        return super.create(req, res);
    }
    /**
     * @api {put} /users/:userID/stats Update user statistic
     * @apiGroup Stats
     * @apiParam {Number} userID id User identifier
     * @apiParam {Number} hardWins Quantity of wins hard level sudoku
     * @apiParam {Number} mediumWins Quantity of wins medium level sudoku
     * @apiParam {Number} easyWins Quantity of wins easy level sudoku
     * @apiParam {Number} hardLoses Quantity of loses hard level sudoku
     * @apiParam {Number} mediumLoses Quantity of loses medium level sudoku
     * @apiParam {Number} easyLoses Quantity of loses easy level sudoku
     * @apiSuccess {Number} stats.id Stats id
     * @apiSuccess {Number} stats.hardWins Quantity of wins hard level sudoku
     * @apiSuccess {Number} stats.mediumWins Quantity of wins medium level sudoku
     * @apiSuccess {Number} stats.easyWins Quantity of wins easy level sudoku
     * @apiSuccess {Number} stats.hardLoses Quantity of loses hard level sudoku
     * @apiSuccess {Number} stats.mediumLoses Quantity of loses medium level sudoku
     * @apiSuccess {Number} stats.easyLoses Quantity of loses easy level sudoku
     * @apiSuccess {Number} stats.userId User Id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id":1,
     *      "hardWins":0,
     *      "hardLoses":0,
     *      "mediumWins":0,
     *      "mediumLoses":0,
     *      "easyWins":1,
     *      "easyLoses":2,
     *      "userId":1
     *    }  
     */
    async update(req, res) {
        req.body.userId = req.params.id = req.params.userId;
        const stat = await this.service.read(req.params.userId);
        const checkValue = await checkAuth(req.ability, 'update', stat);
        return checkValue.access ? super.update(req, res) : checkValue.error.message;
    }
}

module.exports = (statsService) => {
    const controller = new StatsController(statsService);
    return controller.router;
}