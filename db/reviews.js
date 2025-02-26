const client = require(`./client.js`);

const createReview = async(reviewRestaurant, reviewUser, reviewText, reviewRating) => {
    try{
        await client.query(`
                INSERT INTO reviews (restaurant_name, username, review, rating)
                VALUES('${reviewRestaurant}', '${reviewUser}', '${reviewText}', '${reviewRating}');
            `);

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    createReview
}