const { User } = require('../../../models/user');
const { Pin } = require('../../../models/Pin');
const { Review } = require('../../../models/review');
const request = require('supertest');
const mongoose = require('mongoose');

let server;

describe('/api/reviews', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        await Pin.deleteMany({});
        server.close();
    });

    describe('GET /:reviewId', () => {
        let pin;
        let pinId;
        let token;
        let tokenOne;
        let tokenTwo;
        let userIdOne;
        let userIdTwo
        let review;
        let reviewId;

        beforeEach(async () => {
            const userOne = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();
            userIdOne = userOne._id;

            const userTwo = await new User({
                username: 'otherUsername',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenTwo = new User(userTwo).generateAuthToken();
            userIdTwo = userTwo._id;

            pin = await new Pin({
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    userId: userIdOne
                }).save();
            pinId = pin._id;
            token = tokenTwo;

            review = await new Review({
                description: 'Good!',
                rating: 4,
                pinId: pinId,
                userId: userIdTwo
            }).save();
            reviewId = review._id;
        });

        const exec = async () => {
            return await request(server)
            .get(`/api/reviews/${reviewId}`)
            .set('x-auth-token', token)
            .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 200 for valid request and the array of reviews with user info', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('description');
        });
    });

    describe('GET /all/:pinId', () => {
        let pin;
        let pinId;
        let token;
        let tokenOne;
        let tokenTwo;
        let userIdOne;
        let userIdTwo
        let review;

        beforeEach(async () => {
            const userOne = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();
            userIdOne = userOne._id;

            const userTwo = await new User({
                username: 'otherUsername',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenTwo = new User(userTwo).generateAuthToken();
            userIdTwo = userTwo._id;

            pin = await new Pin({
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    userId: userIdOne
                }).save();
            pinId = pin._id;
            token = tokenTwo;

            review = await new Review({
                description: 'Good!',
                rating: 4,
                pinId: pinId,
                userId: userIdTwo
            }).save();
        });

        const exec = async () => {
            return await request(server)
            .get(`/api/reviews/all/${pinId}`)
            .set('x-auth-token', token)
            .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 200 for valid request and the array of reviews with user info', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toHaveProperty('description');
        });
    });

    describe('POST /:pinId', () => {
        let pin;
        let pinId;
        let token;
        let userId;
        let description;
        let rating;

        beforeEach(async () => {
            description = 'Good pin!';
            rating = 5;

            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
            userId = user._id;

            pin = await new Pin({
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    userId: userId
                }).save();
            pinId = pin._id;
        });

        const exec = async () => {
            return await request(server)
            .post(`/api/reviews/${pinId}`)
            .set('x-auth-token', token)
            .send({
                description: description,
                rating: rating
            });
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

        it('should return 404 if the pin with the given id does not exist', async () => {
            pinId = mongoose.Types.ObjectId();;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 200 for valid request and 400 if the pin already has a review from the same user', async () => {
            const resOne = await exec();
            const resTwo = await exec();

            expect(resOne.status).toBe(200);
            expect(resOne.body).toHaveProperty('rating', 5);

            expect(resTwo.status).toBe(400);
        });
    });

    describe('PUT /:reviewId', () => {
        let pin;
        let pinId;
        let token;
        let tokenOne;
        let tokenTwo;
        let userIdOne;
        let userIdTwo
        let newDescription;
        let newRating;
        let review;
        let reviewId;

        beforeEach(async () => {
            newDescription = 'new Description';
            newRating = 4;

            const userOne = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();
            userIdOne = userOne._id;

            const userTwo = await new User({
                username: 'otherUsername',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenTwo = new User(userTwo).generateAuthToken();
            userIdTwo = userTwo._id;

            pin = await new Pin({
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    userId: userIdOne
                }).save();
            pinId = pin._id;
            token = tokenTwo;

            review = await new Review({
                description: 'Good!',
                rating: 4,
                pinId: pinId,
                userId: userIdTwo
            }).save();
            reviewId = review._id;
        });

        const exec = async () => {
            return await request(server)
            .put(`/api/reviews/${reviewId}`)
            .set('x-auth-token', token)
            .send({
                description: newDescription,
                rating: newRating
            });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if the review with the given id does not exist', async () => {
            reviewId = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 400 if the pin does not contain a review from that user', async () => {
            token = tokenOne;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 200 if the if valid fields', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('description', newDescription);
        });
    });

    describe('DELETE /:reviewId', () => {
        let pin;
        let pinId;
        let token;
        let tokenOne;
        let tokenTwo;
        let userIdOne;
        let userIdTwo;
        let review;
        let reviewId;

        beforeEach(async () => {
            const userOne = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();
            userIdOne = userOne._id;

            const userTwo = await new User({
                username: 'otherUsername',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenTwo = new User(userTwo).generateAuthToken();
            userIdTwo = userTwo._id;

            pin = await new Pin({
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    userId: userIdOne
                }).save();
            pinId = pin._id;
            token = tokenTwo;

            review = await new Review({
                description: 'Good!',
                rating: 4,
                pinId: pinId,
                userId: userIdTwo
            }).save();
            reviewId = review._id;
        });

        const exec = async () => {
            return await request(server)
            .delete(`/api/reviews/${reviewId}`)
            .set('x-auth-token', token)
            .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if the pin with the given id does not exist', async () => {
            reviewId = mongoose.Types.ObjectId();;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 400 if the pin does not contain a review from that user', async () => {
            token = tokenOne;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 200 if the if valid fields', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
        });
    });
});