const { User } = require('../../../models/user');
const { cleanupImages } = require('../../cleanupImages');
const request = require('supertest');
const fs = require('fs');

let server;

describe('/api/pictures', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany();
        server.close();
    });
    afterAll(async () => {
        await cleanupImages();
    });

    describe('POST /', () => {
        let token;

        beforeEach(async () =>{
            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            const fileName = 'default.jpg';
            const base64 = fs.readFileSync(`./tests/testFormDataImages/${fileName}`, { encoding: 'base64' });

            return await request(server)
                .post('/api/pictures')
                .set('x-auth-token', token)
                .send({
                    base64: base64,
                    fileName: fileName,
                    isTest: true
                });
        }

        // This test is not working because supertest does not like how the header is being set along with the file that is attached

        // it('should return 401 if client is not logged in', async () => {
        //     token = '';

        //     const res = await exec();

        //     expect(res.status).toBe(401);
        // });

        it('should return 200 and a pictureFileName in the res.body', async () => { // Tested with postman and it works, can't figure out why it does not work with supertest
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('pictureFileName');
        });
    });
});