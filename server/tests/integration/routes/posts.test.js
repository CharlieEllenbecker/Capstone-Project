const { User } = require('../../../models/user');
const { Pin } = require('../../../models/pin');
const { Post } = require('../../../models/post');
const { cleanupImages } = require('../../cleanupImages');
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('supertest');

let server;

describe('/api/posts', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        await Pin.deleteMany({});
        await Post.deleteMany({});
        server.close();
    });
    afterAll(async () => {
        await cleanupImages();
    });

    describe('GET /all/:pinId', () => {
        let token;
        let userId;
        let pinId;

        beforeEach(async () => {
            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
            userId = user._id;

            const pin = await new Pin({
                coordinate: {
                    latitude: 43.04199,
                    longitude: -87.92809,
                },
                title: 'Second Amazing Food Place',
                description: 'This is the second best food place',
                tags: [{ name: 'Food' }],
                userId: userId
            }).save();
            pinId = pin._id;

            const posts = await Post.insertMany([
                {
                    description: 'Post 1',
                    postPictureFileName: 'food-banner1.jpg',
                    pinId: pinId,
                    userId: userId
                },
                {
                    description: 'Post 2',
                    postPictureFileName: 'food-banner2.jpg',
                    pinId: pinId,
                    userId: userId
                },
                {
                    description: 'Post 3',
                    postPictureFileName: 'food-banner3.jpg',
                    pinId: pinId,
                    userId: userId
                }
            ]);
        });

        const exec = async () => {
            return await request(server)
                .get(`/api/posts/all/${pinId}`)
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if the pin does not exist', async () => {
            pinId = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return all posts for the given pinId', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(3);
        });
    });

    describe('GET /:postId', () => {
        let token;
        let userId;
        let pinId;
        let postId;

        beforeEach(async () => {
            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
            userId = user._id;

            const pin = await new Pin({
                coordinate: {
                    latitude: 43.04199,
                    longitude: -87.92809,
                },
                title: 'Second Amazing Food Place',
                description: 'This is the second best food place',
                tags: [{ name: 'Food' }],
                userId: userId
            }).save();
            pinId = pin._id;

            const post = await new Post({
                description: 'Post 1',
                postPictureFileName: 'food-banner1.jpg',
                pinId: pinId,
                userId: userId
            }).save();
            postId = post._id;
        });

        const exec = async () => {
            return await request(server)
                .get(`/api/posts/${postId}`)
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if the post does not exist', async () => {
            postId = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should the post for the given postId', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('description');
        });
    });

    describe('POST /', () => {
        let token;
        let userId;
        let pinId;
        let description;

        beforeEach(async () => {
            description = 'New Post'

            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
            userId = user._id;

            const pin = await new Pin({
                coordinate: {
                    latitude: 43.04199,
                    longitude: -87.92809,
                },
                title: 'Second Amazing Food Place',
                description: 'This is the second best food place',
                tags: [{ name: 'Food' }],
                userId: userId
            }).save();
            pinId = pin._id;
        });

        const exec = async () => {
            const file = fs.createReadStream('./tests/testFormDataImages/default.jpg');

            return await request(server)
                .post(`/api/posts/${pinId}`)
                .field('description', description)
                .set('Content-Type', 'multipart/form-data')
                .set('x-auth-token', token)
                .attach('image', file);
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if description is less than 5 characters', async () => {
            description = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if description is more than 1024 characters', async () => {
            description = new Array(1026).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return the new post', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('description');
        });
    });

    describe('PUT /:postId', () => {
        let token;
        let userId;
        let pinId;
        let postId;
        let newDescription = 'new description';

        beforeEach(async () => {
            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
            userId = user._id;

            const pin = await new Pin({
                coordinate: {
                    latitude: 43.04199,
                    longitude: -87.92809,
                },
                title: 'Second Amazing Food Place',
                description: 'This is the second best food place',
                tags: [{ name: 'Food' }],
                userId: userId
            }).save();
            pinId = pin._id;

            const post = await new Post({
                description: 'Post 1',
                postPictureFileName: 'food-banner1.jpg',
                pinId: pinId,
                userId: userId
            }).save();
            postId = post._id;
        });

        const exec = async () => {
            return await request(server)
                .put(`/api/posts/${postId}`)
                .set('x-auth-token', token)
                .send({
                    description: newDescription
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if the post does not exist', async () => {
            postId = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return the updated post for the given postId', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('description', newDescription);
        });
    });
});