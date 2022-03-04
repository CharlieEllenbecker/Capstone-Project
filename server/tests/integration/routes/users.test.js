const { User } = require('../../../models/user');
const request = require('supertest');
const bcrypt = require('bcrypt');

let server;

describe('/api/users', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        server.close();
    });

    describe('GET /me', () => {
        let user;
        let token;
        let email = 'john.smith@gmail.com';

        beforeEach(async () => {
            user = await new User({
                email: email,
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .get('/api/users/me')
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return user data if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('email', email);
        });
    });

    describe('POST /', () => {
        let email;
        let password;

        beforeEach(async () => {
            email = 'john.smith@gmail.com';
            password = 'password123';
        });

        const exec = async () => {
            return await request(server)
                .post('/api/users')
                .send({
                    email: email,
                    password: password
                });
        }

        it('should return 400 if email is not valid', async () => {
            email = 'invalid email';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is less than 5 characters', async () => {
            email = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is more than 256 characters', async () => {
            email = new Array(258).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is less than 5 characters', async () => {
            password = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is more than 1024 characters', async () => {
            email = new Array(1026).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if user already exist', async () => {
            const user = await new User({
                email: email,
                password: password
            }).save();

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return token if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.header).toHaveProperty('x-auth-token');
        });
    });

    describe('POST /login', () => {
        let user;
        let email;
        let password;

        beforeEach(async () => {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash('password123', salt);

            user = await new User({
                email: 'john.smith@gmail.com',
                password: hash
            }).save();
            
            email = 'john.smith@gmail.com';
            password = 'password123';
        });

        const exec = async () => {
            return await request(server)
                .post('/api/users/login')
                .send({
                    email: email,
                    password: password
                });
        }

        it('should return 400 if email is not valid', async () => {
            email = 'invalid email';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is less than 5 characters', async () => {
            email = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if email is more than 256 characters', async () => {
            email = new Array(258).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is less than 5 characters', async () => {
            password = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is more than 1024 characters', async () => {
            email = new Array(1026).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if user does not exist', async () => {
            email = 'joe.buck@gmail.com';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password id incorrect', async () => {
            password = 'incorrectpassword';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return token if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.header).toHaveProperty('x-auth-token');
        });
    });

    describe('DELETE /delete', () => {
        let user;
        let email;
        let password;
    
        beforeEach(async () => {
            email = 'joe.buck@gmail.com';
            password = 'password123';

            user = await new User({
                email: email,
                password: password
            }).save();

        });

        const exec = async () => {
            return await request(server)
                .delete('/api/users/delete')
                .send({
                    email: email
                });
        }
        //if the user doesnt exist - 404
        it('should return 404 if user does not exist', async () => {

            email = 'joe.deer@gmail.com';

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 200 if successful', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            const user = User.findOne(email);
            expect(!user);
        });
    });
});
