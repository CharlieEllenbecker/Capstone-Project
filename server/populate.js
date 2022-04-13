const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const client = new MongoClient('mongodb://localhost/');

const populate = async () => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('capstone-project');
    const userCollection = db.collection('users');
    const pinCollection = db.collection('pins');

    const salt = await bcrypt.genSalt(10);
    const passwordOne = await bcrypt.hash('password', salt);
    const passwordTwo = await bcrypt.hash('password', salt);

    const userOneData = {
        username: 'testUser1',
        email: 'test1@gmail.com',
        password: passwordOne,
        profilePictureFileName: 'profilepic1.png'
    };

    const userTwoData = {
        username: 'testUser2',
        email: 'test2@gmail.com',
        password: passwordTwo,
        profilePictureFileName: 'profilepic1.png'
    };

    const userOne = await userCollection.insertOne(userOneData);
    const userTwo = await userCollection.insertOne(userTwoData);
    const userOneId = userOne._id;
    const userTwoId = userTwo._id;
    
    const pins = await pinCollection.insertMany([
        {
            coordinate: {
                latitude: 43.03725,
                longitude: -87.91891,
            },
            title: 'Amazing Food Place',
            description: 'This is the best food place',
            reviews: [
                {
                    userId: userTwoId,
                    description: 'Cool!',
                    rating: 5
                }
            ],
            posts: [
                {
                    description: 'Good 1',
                    postPictureFileName: 'food-banner1.jpg'
                }
            ],
            userId: userOneId
        },
        {
            coordinate: {
                latitude: 43.04199,
                longitude: -87.92809,
            },
            title: 'Second Amazing Food Place',
            description: 'This is the second best food place',
            reviews: [
                {
                    userId: userTwoId,
                    description: 'Cool!',
                    rating: 4
                }
            ],
            posts: [
                {
                    description: 'Good 2',
                    postPictureFileName: 'food-banner2.jpg'
                }
            ],
            userId: userOneId
        },
        {
            coordinate: {
                latitude: 43.02452,
                longitude: -87.91511,
            },
            title: 'Third Amazing Food Place',
            description: 'This is the third best food place',
            reviews: [
                {
                    userId: userTwoId,
                    description: 'Cool!',
                    rating: 3
                }
            ],
            posts: [
                {
                    description: 'Good 3',
                    postPictureFileName: 'food-banner3.jpg'
                }
            ],
            userId: userOneId
        },
        {
            coordinate: {
                latitude: 43.04363,
                longitude: -87.90602,
            },
            title: 'Fourth Amazing Food Place',
            description: 'This is the fourth best food place',
            reviews: [
                {
                    userId: userTwoId,
                    description: 'Cool!',
                    rating: 2
                }
            ],
            posts: [
                {
                    description: 'Good 4',
                    postPictureFileName: 'food-banner4.jpg'
                }
            ],
            userId: userOneId
        },
        {
            coordinate: {
                latitude: 43.0352,
                longitude: -87.904921,
            },
            title: 'Fifth Amazing Food Place',
            description: 'This is the fifth best food place',
            reviews: [
                {
                    userId: userTwoId,
                    description: 'Cool!',
                    rating: 1
                }
            ],
            posts: [
                {
                    description: 'Good 5',
                    postPictureFileName: 'food-banner5.jpg'
                }
            ],
            userId: userOneId
        }
    ]);
}

populate()
    .then(console.log('good'))
    .catch(console.error)
    .finally(() => client.close());