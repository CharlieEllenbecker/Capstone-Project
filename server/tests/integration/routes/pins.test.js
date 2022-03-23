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
        let userId;

        beforeEach(async () => {
            const user = await new User({
                username: 'johnSmith',
                email: 'john.smith@gmail.com',
                password: 'password123'
            }).save();
            token = new User(user).generateAuthToken();
            userId = user._id;

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
                            userId: userId,
                            description: 'Cool!',
                            rating: 4.5
                        }
                    ],
                    userId: userId
                },
                {
                    coordinate: {
                        latitude: 43.04199,
                        longitude: -87.92809,
                    },
                    title: 'Second Amazing Food Place',
                    description: 'This is the second best food place',
                    userId: userId
                },
                {
                    coordinate: {
                        latitude: 43.02452,
                        longitude: -87.91511,
                    },
                    title: 'Third Amazing Food Place',
                    description: 'This is the third best food place',
                    userId: userId
                },
                {
                    coordinate: {
                        latitude: 43.04363,
                        longitude: -87.90602,
                    },
                    title: 'Fourth Amazing Food Place',
                    description: 'This is the fourth best food place',
                    userId: userId
                },
                {
                    coordinate: {
                        latitude: 43.0352,
                        longitude: -87.904921,
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
});