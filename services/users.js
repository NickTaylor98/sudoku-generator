'use strict';
const CrudService = require('./crud');
const validator = require('../helpers/validator');
const bcrypt = require('bcryptjs');

class UserService extends CrudService {
    constructor(rep, errors) {
        super(rep, errors);
    }
    async readChunk(options)
    {
        options.attributes = ['id', 'login'];
        return super.readChunk(options);
    }
    async read(id)
    {
        const user = await super.read(id);
        return {
            id: user.id, 
            login: user.login
        };
    }
    async readByLogin (login)
    {
        const item = await this.repository.findOne({where : {login : login}, raw : true});
        if (!item) throw this.errors.notFound;
        return item;
    }
    async create(data) {
        const error = validator.check('user', data);
        if (error.error) throw this.errors.invalidData;
        const password = await bcrypt.hash(data.password,10);
        data.password = password;
        return super.create(data);
    }

    async update(id, data) {
        const error = validator.check('user', data);
        if (error.error) throw this.errors.invalidData;
        const password = await bcrypt.hash(data.password,10);
        data.password = password;
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