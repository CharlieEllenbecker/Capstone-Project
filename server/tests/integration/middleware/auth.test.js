const { User } = require('../../../models/user');
const request = require('supertest');

let server;

describe('auth middleware', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(() => {
        server.close();
    });
    
    let token;

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    const exec = async () => {
        return await request(server)
            .get('/api/users/is-auth')
            .set('x-auth-token', token)
            .send();
    }

    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'invalid token';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});