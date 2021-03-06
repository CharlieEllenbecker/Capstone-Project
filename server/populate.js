const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const client = new MongoClient("mongodb://localhost/");

const populate = async () => {
    await client.connect();

    const existingDb = client.db('capstone-project');
    await existingDb.dropDatabase();
    
    const db = client.db('capstone-project');

    const userCollection = db.collection('users');
    const pinCollection = db.collection('pins');
    const postCollection = db.collection('posts');
    const reviewCollection = db.collection('reviews');

    const salt = await bcrypt.genSalt(10);
    const passwordOne = await bcrypt.hash('password', salt);
    const passwordTwo = await bcrypt.hash('password', salt);

    const userOne = await userCollection.insertOne({
            username: 'testUser1',
            email: 'test1@gmail.com',
            password: passwordOne,
            profilePictureFileName: 'profilepic1.png'
    });

    const userTwo = await userCollection.insertOne({
        username: 'testUser2',
        email: 'test2@gmail.com',
        password: passwordTwo,
        profilePictureFileName: 'profilepic1.png'
    });

    const userOneId = userOne.insertedId;
    const userTwoId = userTwo.insertedId;
    
    const pinOne = await pinCollection.insertOne({
        location: {
            type: 'Point',
            coordinates: [-87.91891, 43.03725]
        },
        title: 'Amazing Food Place',
        description: 'This is the best food place',
        rating: 5,
        tags: [{ name: 'Landscape' },],
        userId: userOneId
    });

    const pinTwo = await pinCollection.insertOne({
        location: {
            type: 'Point',
            coordinates: [-87.92809, 43.04199]
        },
        title: 'Second Amazing Food Place',
        description: 'This is the second best food place',
        rating: 4,
        tags: [{ name: 'Portrait' }, { name: 'Landscape' }],
        userId: userOneId
    });

    const pinThree = await pinCollection.insertOne({
        location: {
            type: 'Point',
            coordinates: [-87.91511, 43.02452]
        },
        title: 'Third Amazing Food Place',
        description: 'This is the third best food place',
        rating: 3,
        tags: [{ name:  'Abstract' },],
        userId: userOneId
    });

    const pinFour = await pinCollection.insertOne({
        location: {
            type: 'Point',
            coordinates: [-87.90602, 43.04363]
        },
        title: 'Fourth Amazing Food Place',
        description: 'This is the fourth best food place',
        rating: 2,
        userId: userTwoId
    });

    const pinFive = await pinCollection.insertOne({
        location: {
            type: 'Point',
            coordinates: [-87.904921, 43.0352]
        },
        title: 'Fifth Amazing Food Place',
        description: 'This is the fifth best food place',
        rating: 1,
        userId: userTwoId
    });

    const pinOneId = pinOne.insertedId;
    const pinTwoId = pinTwo.insertedId;
    const pinThreeId = pinThree.insertedId;
    const pinFourId = pinFour.insertedId;
    const pinFiveId = pinFive.insertedId;

    const posts = await postCollection.insertMany([
        {
            description: 'Good 1',
            postPictureFileName: 'food-banner1.jpg',
            pinId: pinOneId,
            userId: userTwoId
        },
        {
            description: 'Good 2',
            postPictureFileName: 'food-banner2.jpg',
            pinId: pinTwoId,
            userId: userTwoId
        },
        {
            description: 'Good 3',
            postPictureFileName: 'food-banner3.jpg',
            pinId: pinThreeId,
            userId: userTwoId
        },
        {
            description: 'Good 4',
            postPictureFileName: 'food-banner4.jpg',
            pinId: pinFourId,
            userId: userOneId
        },
        {
            description: 'Good 5',
            postPictureFileName: 'food-banner5.jpg',
            pinId: pinFiveId,
            userId: userOneId
        }
    ]);

    const reviews = await reviewCollection.insertMany([
        {
            description: 'Cool! 1',
            rating: 5,
            pinId: pinOneId,
            userId: userTwoId
        },
        {
            description: 'Cool! 2',
            rating: 4,
            pinId: pinTwoId,
            userId: userTwoId
        },
        {
            description: 'Cool! 3',
            rating: 3,
            pinId: pinThreeId,
            userId: userTwoId
        },
        {
            description: 'Cool! 4',
            rating: 2,
            pinId: pinFourId,
            userId: userOneId
        },
        {
            description: 'Cool! 5',
            rating: 1,
            pinId: pinFiveId,
            userId: userOneId
        }
    ]);
}

populate()
  .then(console.log("The database has been populated."))
  .catch(console.error)
  .finally(() => client.close());
