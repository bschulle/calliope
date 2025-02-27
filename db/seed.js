require(`dotenv`).config();

const client = require(`./client.js`);

const { createRestaurant } = require("./restaurants.js");
const { createReview } = require("./reviews.js");
const { createUser }= require(`./users.js`);

const dropTables = async() => {
    try{
        await client.query (`
            DROP TABLE IF EXISTS users, restaurants, reviews;
        `)

    }catch(err){
        console.log(err);
    }
}

const createTables = async() => {
    try{
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(30) NOT NULL UNIQUE,
                password VARCHAR(60) NOT NULL
            );
            CREATE TABLE restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(30) NOT NULL UNIQUE,
                type VARCHAR(30)
            );
            CREATE TABLE reviews (
                id SERIAL PRIMARY KEY,
                restaurant_name VARCHAR(30) NOT NULL UNIQUE,
                username VARCHAR(30) NOT NULL UNIQUE,
                review TEXT,
                rating SMALLINT
            );
        `)
    }catch(err) {
        console.log(err);
    }
}

const syncAndSeed = async() => {
    await client.connect();
    console.log('Connected to database');

    console.log(`dropping tables`)
    await dropTables();
    console.log(`tables dropped`)

    console.log(`creating tables`);
    await createTables();
    console.log('tables created');

    console.log(`creating user`);
    await createUser('Bob', 'bob1');
    await createUser('Larry', 'larry1');
    await createUser('Petunia', 'petunia1');
    await createUser('Laura', 'laura1');
    console.log(`user created`);

    
    console.log(`creating restaurants`);
    await createRestaurant('Applebees', 'American');
    await createRestaurant('Olive Garden', 'Italian');
    await createRestaurant('Chipotle', 'Mexican');
    await createRestaurant('Chilis', 'American');
    console.log(`restaurants created`);

    console.log(`creating review`);
    await createReview('Applebees', 'Bob', 'Terrible', '1');
    console.log(`review created`);


    await client.end();
    console.log('Disconnected from database');
}

syncAndSeed();