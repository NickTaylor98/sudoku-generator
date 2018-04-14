const CrudController = require('./crud');
class StatsController extends CrudController {
    constructor(service) {
        super(service);
        this.registerRoutes();
    }
}

module.exports = (statsService) => {
    const controller = new StatsController(statsService);
    return controller.router;
}