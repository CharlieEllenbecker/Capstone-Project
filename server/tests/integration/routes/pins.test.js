const { User } = require('../../../models/user');
const { Pin } = require('../../../models/pin');
const request = require('supertest');
const mongoose = require('mongoose');

let server;

describe('/api/pins', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        await Pin.deleteMany({});
        server.close();
    });

    describe('GET /', () => {
        let token;
        let userId;

        beforeEach(async () => {
            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
            userId = user._id;

            await Pin.insertMany([
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.03725, -87.91891]
                    },
                    title: 'Amazing Food Place',
                    description: 'This is the best food place',
                    userId: userId
                },
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.04199, -87.92809]
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    userId: userId
                },
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.02452, -87.91511]
                    },
                    title: 'Third Amazing Food Place',
                    description: 'This is the third best food place',
                    userId: userId
                },
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.04363, -87.90602]
                    },
                    title: 'Fourth Amazing Food Place',
                    description: 'This is the fourth best food place',
                    userId: userId
                },
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.0352, -87.904921]
                    },
                    title: 'Fifth Amazing Food Place',
                    description: 'This is the fifth best food place',
                    userId: userId
                }
            ]);
        });

        const exec = async () => {
            return await request(server)
                .get('/api/pins')
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return list of pins', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.some(p => p.title === 'Amazing Food Place')).toBeTruthy();
            expect(res.body.some(p => p.title === 'Second Amazing Food Place')).toBeTruthy();
        });
    });

    describe('GET /my', () => {
        let tokenOne;
        let userIdOne;
        let userIdTwo;

        beforeEach(async () => {
            usernameOne = 'johnSmith';
            usernameTwo = 'joeBuck';

            const userOne = await new User({
                username: usernameOne,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();
            userIdOne = userOne._id;

            const userTwo = await new User({
                username: usernameTwo,
                email: 'joe.buck@gmail.com',
                password: 'password123'
            }).save();
            userIdTwo = userTwo._id;

            await Pin.insertMany([
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.03725, -87.91891]
                    },
                    title: 'Amazing Food Place',
                    description: 'This is the best food place',
                    rating: 4.5,
                    userId: userIdOne
                },
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.04199, -87.92809]
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    rating: 0,
                    userId: userIdOne
                },
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.02452, -87.91511]
                    },
                    title: 'Third Amazing Food Place',
                    description: 'This is the third best food place',
                    rating: 0,
                    userId: userIdOne
                },
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.04363, -87.90602]
                    },
                    title: 'Fourth Amazing Food Place',
                    description: 'This is the fourth best food place',
                    rating: 0,
                    userId: userIdOne
                },
                {
                    location: {
                        type: 'Point',
                        coordinates: [43.0352, -87.904921]
                    },
                    title: 'Fifth Amazing Food Place',
                    description: 'This is the fifth best food place',
                    rating: 0,
                    userId: userIdTwo
                }
            ]);
        });

        const exec = async () => {
            return await request(server)
                .get('/api/pins/my')
                .set('x-auth-token', tokenOne)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            tokenOne = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return list of pins', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(4);
        });
    });

    describe('GET /:pinId', () => {
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
                location: {
                    type: 'Point',
                    coordinates: [43.03725, -87.91891]
                },
                title: 'Amazing Food Place',
                description: 'This is the best food place',
                userId: userId
            }).save();
            pinId = pin._id;
        });

        const exec = async () => {
            return await request(server)
                .get(`/api/pins/${pinId}`)
                .set('x-auth-token', token)
                .send();
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return the pin with the given id', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
        });
    });

    describe('POST /', () => {
        let token;
        let title;
        let description;

        beforeEach(async () => {
            title = 'Second Amazing Food Place';
            description = 'This is the second best food place';

            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
        });

        const exec = async () => {
            return await request(server)
                .post('/api/pins')
                .set('x-auth-token', token)
                .send({
                    location: {
                        type: 'Point',
                        coordinates: [43.04199, -87.92809]
                    },
                    title: title,
                    description: description,
                    tags: [{ name: 'Food' }]
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if title is less than 5 characters', async () => {
            title = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if title is more than 256 characters', async () => {
            title = new Array(258).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
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

        it('should return the new pin', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title');
        });
    });

    describe('PUT /:id', () => {
        let pinId;
        let token;
        let tokenOne;
        let tokenTwo;
        let userId;
        let oldLocation;
        let newLocation;
        let newTitle;

        beforeEach(async () => {
            newTitle = 'New Title';
            oldLocation = {
                type: 'Point',
                coordinates: [43.04199, -87.92809]
            }
            newLocation = {
                type: 'Point',
                coordinates: [45.04199, -90.92809]
            };

            const userOne = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();
            userId = userOne._id;

            const userTwo = await new User({
                username: 'otherUsername',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenTwo = new User(userTwo).generateAuthToken();

            const pin = await new Pin({
                    location: oldLocation,
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    userId: userId
                }).save();
            pinId = pin._id;

            token = tokenOne;
        });

        const exec = async () => {
            return await request(server)
                .put(`/api/pins/${pinId}`)
                .set('x-auth-token', token)
                .send({
                    location: newLocation,
                    title: newTitle,
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }]
                });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 404 if the pin with the given id does not exist', async () => {
            pinId = mongoose.Types.ObjectId();;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 404 if the pin with the given id and username does not exist', async () => {
            token = tokenTwo;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return the updated pin', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', newTitle);
            expect(res.body.location).toHaveProperty('coordinates', oldLocation.coordinates);   // can't change the location
        });
    });
});