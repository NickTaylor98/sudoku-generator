const CrudService = require('./crud');
const validator = require('../helpers/validator');
class UserService extends CrudService {
    constructor(rep, errors) {
        super(rep, errors);
    }
    async create(data) {
        const error = validator.check('user', data);
        if (error.error) throw this.errors.invalidData;
        return super.create(data);
    }
    async update(id, data) {
        const error = validator.check('user', data);
        if (error.error) throw this.errors.invalidData;
        return super.update(id, data);
    }
}

module.exports = UserService;