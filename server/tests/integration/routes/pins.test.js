const { User } = require('../../../models/user');
const { Pin } = require('../../../models/Pin');
const request = require('supertest');

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
        const title = 'Second Amazing Food Place';

        beforeEach(async () => {
            username = 'johnSmith';

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
                        description: 'This is the second best food place'
                    });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return the new pin', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', title);
        });
    });

    // describe('PUT /:id', () => {

    // });

    // describe('PUT /review/:pinId', () => {
        
    // });

    // describe('DELETE /review/:pinId', () => {
        
    // });
});