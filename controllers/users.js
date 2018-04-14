const CrudController = require('./crud');
class UsersController extends CrudController {
    constructor(service) {
        super(service);
        this.registerRoutes();
    }
}
module.exports = (usersService) => {
    const controller = new UsersController(usersService);
    return controller.router;
}