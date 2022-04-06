const { User } = require('../../../models/user');
const { Pin } = require('../../../models/pin');
const { Post } = require('../../../models/post');
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

    describe('POST /', () => {
        let token;
        let userId;
        let pinId;
        let description;
        let fileExtension;

        beforeEach(async () => {
            description = 'New Post'
            fileExtension = 'image/jpg';

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
            return await request(server)
                .post(`/api/posts/${pinId}`)
                .set('x-auth-token', token)
                .send({
                    description: description,
                    fileExtension: fileExtension
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

        it('should return the new post and be saved to the pin', async () => {
            const res = await exec();

            const pin = await Pin.findById(pinId);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('description');
            expect(res.body).toHaveProperty('postPicture');
            expect(pin.posts).toHaveLength(1);
        });
    });
});