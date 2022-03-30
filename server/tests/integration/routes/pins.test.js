const { User } = require('../../../models/user');
const { Pin } = require('../../../models/Pin');
const request = require('supertest');
const mongoose = require('mongoose');

let server;

describe('/api/tags', () => {
    beforeEach(() => { server  = require('../../../index'); });
    afterEach(async () => {
        await User.deleteMany({});
        await Pin.deleteMany({});
        server.close();
    });

    describe('GET /', () => {
        let token;
        let username;

        beforeEach(async () => {
            username = 'johnSmith';

            const user = await new User({
                username: username,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();

            await Pin.collection.insertMany([
                {
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Amazing Food Place',
                    description: 'This is the best food place',
                    reviews: [
                        {
                            username: username,
                            description: 'Cool!',
                            rating: 4.5
                        }
                    ],
                    username: username
                },
                {
                    coordinate: {
                        latitude: 43.04199,
                        longitude: -87.92809,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    username: username
                },
                {
                    coordinate: {
                        latitude: 43.02452,
                        longitude: -87.91511,
                    },
                    title: 'Third Amazing Food Place',
                    description: 'This is the third best food place',
                    username: username
                },
                {
                    coordinate: {
                        latitude: 43.04363,
                        longitude: -87.90602,
                    },
                    title: 'Fourth Amazing Food Place',
                    description: 'This is the fourth best food place',
                    username: username
                },
                {
                    coordinate: {
                        latitude: 43.0352,
                        longitude: -87.904921,
                    },
                    title: 'Fifth Amazing Food Place',
                    description: 'This is the fifth best food place',
                    username: username
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

    describe('GET /pins/my', () => {
        let tokenOne;
        let usernameOne;
        let usernameTwo;

        beforeEach(async () => {
            usernameOne = 'johnSmith';
            usernameTwo = 'joeBuck';

            const userOne = await new User({
                username: usernameOne,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();

            await new User({
                username: usernameTwo,
                email: 'joe.buck@gmail.com',
                password: 'password123'
            }).save();

            await Pin.collection.insertMany([
                {
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Amazing Food Place',
                    description: 'This is the best food place',
                    rating: 4.5,
                    reviews: [
                        {
                            username: usernameTwo,
                            description: 'Cool!',
                            rating: 4.5
                        }
                    ],
                    username: usernameOne
                },
                {
                    coordinate: {
                        latitude: 43.04199,
                        longitude: -87.92809,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    username: usernameOne
                },
                {
                    coordinate: {
                        latitude: 43.02452,
                        longitude: -87.91511,
                    },
                    title: 'Third Amazing Food Place',
                    description: 'This is the third best food place',
                    username: usernameOne
                },
                {
                    coordinate: {
                        latitude: 43.04363,
                        longitude: -87.90602,
                    },
                    title: 'Fourth Amazing Food Place',
                    description: 'This is the fourth best food place',
                    username: usernameOne
                },
                {
                    coordinate: {
                        latitude: 43.0352,
                        longitude: -87.904921,
                    },
                    title: 'Fifth Amazing Food Place',
                    description: 'This is the fifth best food place',
                    username: usernameTwo
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

    describe('POST /', () => {
        let token;
        let username;
        let title;
        let description;

        beforeEach(async () => {
            username = 'johnSmith';
            title = 'Second Amazing Food Place';
            description = 'This is the second best food place';

            const user = await new User({
                username: username,
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
                    coordinate: {
                        latitude: 43.04199,
                        longitude: -87.92809,
                    },
                    title: title,
                    description: description,
                    tags: [{ name: 'Food' }],
                    username: username
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

        it('should return the new pin', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title');
        });
    });

    describe('PUT /:id', () => {
        let pin;
        let pinId;
        let token;
        let tokenOne;
        let tokenTwo;
        let username;
        let oldCoordinate;
        let newCoordinate;
        let newTitle;

        beforeEach(async () => {
            username = 'johnSmith';
            newTitle = 'New Title';
            oldCoordinate = {
                latitude: 43.04199,
                longitude: -87.92809,
            };
            newCoordinate = {
                latitude: 45.04199,
                longitude: -90.92809,
            };

            const userOne = await new User({
                username: username,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();

            const userTwo = await new User({
                username: 'otherUsername',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenTwo = new User(userTwo).generateAuthToken();

            pin = await new Pin({
                    coordinate: oldCoordinate,
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    username: username
                }).save();
            pinId = pin._id;

            token = tokenOne;
        });

        const exec = async () => {
            return await request(server)
                .put(`/api/pins/${pinId}`)
                .set('x-auth-token', token)
                .send({
                    coordinate: newCoordinate,
                    title: newTitle,
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    username: username
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
            expect(res.body.coordinate).toHaveProperty('latitude', oldCoordinate.latitude);   // can't change the location
            expect(res.body.coordinate).toHaveProperty('longitude', oldCoordinate.longitude);
        });
    });

    describe('POST /review/:pinId', () => {
        let pin;
        let pinId;
        let token;
        let username;
        let description;
        let rating;

        beforeEach(async () => {
            username = 'johnSmith';
            description = 'Good pin!';
            rating = 5;

            const user = await new User({
                username: username,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();

            pin = await new Pin({
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    username: username
                }).save();
            pinId = pin._id;
        });

        const exec = async () => {
            return await request(server)
            .post(`/api/pins/review/${pinId}`)
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

        it('should return 200 for valid request and 400 if the pin already has a review from the same user.', async () => {
            const resOne = await exec();
            const resTwo = await exec();

            expect(resOne.status).toBe(200);
            expect(resTwo.status).toBe(400);
            expect(resOne.body.reviews).toHaveLength(1);
            expect(resOne.body).toHaveProperty('rating', 5);
        });
    });

    describe('PUT /review/:pinId', () => {
        let pin;
        let pinId;
        let token;
        let tokenOne;
        let tokenTwo;
        let username;
        let otherUsername;
        let newDescription;
        let newRating;

        beforeEach(async () => {
            username = 'johnSmith';
            otherUsername = 'otherUsername';
            newDescription = 'new Description';
            newRating = 4

            const userOne = await new User({
                username: username,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();

            const userTwo = await new User({
                username: otherUsername,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenTwo = new User(userTwo).generateAuthToken();

            pin = await new Pin({
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    reviews: [{
                        username: otherUsername,
                        description: 'Good pin!',
                        rating: 5
                    }],
                    username: username
                }).save();
            pinId = pin._id;

            token = tokenTwo;
        });

        const exec = async () => {
            return await request(server)
            .put(`/api/pins/review/${pinId}`)
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

        it('should return 404 if the pin with the given id does not exist', async () => {
            pinId = mongoose.Types.ObjectId();;

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
            expect(res.body.reviews[0]).toHaveProperty('description', newDescription);
        });
    });

    describe('DELETE /review/:pinId', () => {
        let pin;
        let pinId;
        let token;
        let tokenOne;
        let tokenTwo;
        let username;
        let otherUsername;
        let newDescription;
        let newRating;

        beforeEach(async () => {
            username = 'johnSmith';
            otherUsername = 'otherUsername';
            newDescription = 'new Description';
            newRating = 4

            const userOne = await new User({
                username: username,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenOne = new User(userOne).generateAuthToken();

            const userTwo = await new User({
                username: otherUsername,
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            tokenTwo = new User(userTwo).generateAuthToken();

            pin = await new Pin({
                    coordinate: {
                        latitude: 43.03725,
                        longitude: -87.91891,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    tags: [{ name: 'Food' }],
                    reviews: [{
                        username: otherUsername,
                        description: 'Good pin!',
                        rating: 5
                    }],
                    username: username
                }).save();
            pinId = pin._id;

            token = tokenTwo;
        });

        const exec = async () => {
            return await request(server)
            .delete(`/api/pins/review/${pinId}`)
            .set('x-auth-token', token)
            .send();
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

        it('should return 400 if the pin does not contain a review from that user', async () => {
            token = tokenOne;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 200 if the if valid fields', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.reviews).toHaveLength(0);
        });
    });
});