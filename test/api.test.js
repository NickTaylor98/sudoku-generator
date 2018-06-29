const {
    expect
} = require('chai');
const {
    users,
    stats
} = require('../context')();
const errors = require('../helpers/errors');
const UsersService = require('../services/users');
const StatsService = require('../services/statistics');
const userService = new UsersService(users, errors);
const statsService = new StatsService(stats, errors);
describe('users testing', () => {
    it('create new user', async () => {
        const data = {
            login: 'testlogin',
            password: 'testpassword'
        };
        const user = await userService.create(data);
        expect(user.login).to.equal('testlogin');
        expect(user.password).not.to.equal('testpassword');
    });
    it('shows info about user #1', async () => {
        const user = await userService.read(1);
        expect(user.login).to.equal('testlogin');
    });

    it('update user', async () => {
        const data = {
            login: 'NatashaP',
            password: 'yyyyy'
        };
        const user = await userService.update(1, data);
        expect(user.login).to.equal('NatashaP');
    });


});


describe('stats testing', () => {
    it('create new stats', async () => {
        const defaultStats = {
            hardWins: 0,
            mediumWins: 0,
            easyWins: 0,
            hardLoses: 0,
            mediumLoses: 0,
            easyLoses: 0,
            userId: 1
        };
        const stats = await statsService.create(defaultStats);
        expect(stats.userId).to.equal(1);
    });

    it('shows info about user stats #1', async () => {
        const stats = await statsService.read(1);
        expect(stats.userId).to.equal(1);
    });


    it('update stats', async () => {
        const data = {
            hardWins: 0,
            mediumWins: 0,
            easyWins: 0,
            hardLoses: 0,
            mediumLoses: 1,
            easyLoses: 0,
            userId: 1
        };
        const stats = await statsService.update(1, data);
        expect(stats.mediumLoses).to.equal(1);
    });
    it('delete stats', async () => {
        await statsService.delete(1);
        try {
            const user = await statsService.read(1);
        } catch (e) {
            expect(e.message).to.equal(errors.notFound.message);
        }
    })
});