'use strict';
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

    async delete(id) {
        const user = await this.read(id);
        const stat = await user.getStatistic();
        if (stat !== null)
        {
            await stat.destroy();
        }
        return super.delete(id);
    }
}

module.exports = UserService;