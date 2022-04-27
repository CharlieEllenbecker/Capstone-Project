const { User } = require('../../../models/user');
const { cleanupImages } = require('../../cleanupImages');
const request = require('supertest');
const mongoose = require('mongoose');
const FormData = require('form-data');
const fs = require('fs');

let server;

describe('/api/pictures', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
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
            const file = fs.createReadStream('./tests/testFormDataImages/default.jpg');
            const formData = new FormData();
            formData.append('image', file);

            return await request(server)
                .post('/api/pictures')
                .set('Content-Type', 'multipart/form-data')
                .set('x-auth-token', token)
                .send(formData);
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 200 and a pictureFileName in the res.body', async () => { // Tested with postman and it works, can't figure out why it does not work with supertest
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty(pictureFileName);
        });
    });
});