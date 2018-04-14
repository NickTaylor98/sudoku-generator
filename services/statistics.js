'use strict';
const CrudService = require('./crud');
const validator = require('../helpers/validator');
class StatService extends CrudService {
    constructor(rep, errors) {
        super(rep, errors);
    }
    async readChunk(opts){
        let stats = await super.readChunk(opts);
        return stats.filter( elem => elem.userId == opts.userId)[0];   
    }
    async create(data) {
        const error = validator.check('stat', data);
        if (error.error) throw this.errors.invalidData;
        const stat = await this.read(data.userId);
        if (stat) throw this.errors.alreadyExists;
        return super.create(data);
    }
    async update(id, data) {
        const error = validator.check('stat', data);
        if (error.error) throw this.errors.invalidData;
        return super.update(id, data);
    }
}
module.exports = StatService;