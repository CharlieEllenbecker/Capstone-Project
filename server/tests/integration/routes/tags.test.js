const { User } = require('../../../models/user');
const config = require('config');
const request = require('supertest');

let server;

describe('/api/tags', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        server.close();
    });

    describe('GET /', () => {
        let token;

        beforeEach(async () => {
            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .get('/api/tags')
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return list of tags from the stored in the default config file', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.toString()).toBe(config.get('tags').toString());
        });
    });
});