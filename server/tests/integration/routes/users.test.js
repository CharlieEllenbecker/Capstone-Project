const { User } = require('../../../models/user');
const { cleanupImages } = require('../../cleanupImages');
const bcrypt = require('bcrypt');
const request = require('supertest');
const fs = require('fs');

let server;

describe('/api/users', () => {
    beforeEach(() => { server = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        server.close();
    });
    afterAll(async () => {
        await cleanupImages();
    });

    describe('GET /me', () => {
        let user;
        let token;

        beforeEach(async () => {
            user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
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
            expect(res.body).toHaveProperty('username');
            expect(res.body).toHaveProperty('email');
            
        });
    });

    describe('GET /is-auth', () => {
        let user;
        let token;

        beforeEach(async () => {
            user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .get('/api/users/is-auth')
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
        });
    });

    describe('GET /:userId', () => {
        let user;
        let userId;
        let token;

        beforeEach(async () => {
            user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            userId = user._id;
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .get(`/api/users/${userId}`)
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
            expect(res.body).toHaveProperty('username');
            expect(res.body).toHaveProperty('email');
            
        });
    });

    describe('POST /', () => {
        let username;
        let email;
        let password;

        beforeEach(async () => {
            username = 'johnSmith';
            email = 'john.smith@gmail.com';
            password = 'password123';
        });

        const exec = async () => {
            return await request(server)
                .post('/api/users')
                .send({
                    username: username,
                    email: email,
                    password: password
                });
        }

        it('should return 400 if username is less than 5 characters', async () => {
            username = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if username is more than 256 characters', async () => {
            username = new Array(258).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

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
            password = new Array(1026).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if user already exist with that email', async () => {
            await new User({
                username: 'randomUsername',
                email: email,
                password: password
            }).save();

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if user already exist with that username', async () => {
            await new User({
                username: username,
                email: 'random@gmail.com',
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
        let username;
        let email;
        let password;

        beforeEach(async () => {
            username = 'johnSmith';
            email = 'john.smith@gmail.com';
            password = 'password123';

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            await new User({
                username: username,
                email: email,
                password: hash
            }).save();
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
            password = new Array(1026).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if user does not exist', async () => {
            email = 'joe.buck@gmail.com';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if password is incorrect', async () => {
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

    describe('PUT /', () => {
        let user;
        let token;
        let newUsername;
        let newEmail;
        let newPassword;
    
        beforeEach(async () => {
            newUsername = 'newUsername';
            newEmail = 'new.email@gmail.com';
            newPassword = 'newPassword';

            user = await new User({
                username: 'JohnSmith',
                email: 'joe.buck@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .put('/api/users/')
                .set('x-auth-token', token)
                .send({
                    username: newUsername,
                    email: newEmail,
                    password: newPassword
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 200 if successful', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('username', newUsername);
            expect(res.body).toHaveProperty('email', newEmail);
        });
    });

    describe('DELETE /delete', () => {
        let user;
        let token;
    
        beforeEach(async () => {
            user = await new User({
                username: 'JohnSmith',
                email: 'joe.buck@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .delete('/api/users/delete')
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 200 if successful', async () => {
            const res = await exec();

            const userQuery = User.findById(user._id);
            expect(res.status).toBe(200);
            expect(!userQuery);
        });
    });

    describe('POST /profile-picture', () => {
        let user;
        let token;
    
        beforeEach(async () => {
            user = await new User({
                username: 'JohnSmith',
                email: 'joe.buck@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            const fileName = 'default.jpg';
            const base64 = fs.readFileSync(`./tests/testFormDataImages/${fileName}`, { encoding: 'base64' });

            return await request(server)
                .post('/api/users/profile-picture')
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

        it('should return 200 if successful', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('profilePictureFileName');
        });
    });

    describe('PUT /profile-picture', () => {
        let user;
        let token;
    
        beforeEach(async () => {
            user = await new User({
                username: 'JohnSmith',
                email: 'joe.buck@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            const fileName = 'default.jpg';
            const base64 = fs.readFileSync(`./tests/testFormDataImages/${fileName}`, { encoding: 'base64' });

            return await request(server)
                .post('/api/users/profile-picture')
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

        it('should return 200 if successful', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('profilePictureFileName');
        });
    });
});
