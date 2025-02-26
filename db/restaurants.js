const client = require(`./client.js`);

const createRestaurant = async(restaurantName, restaurantType) => {
    try{
        await client.query(`
                INSERT INTO restaurants (name, type)
                VALUES ('${restaurantName}', '${restaurantType}');
                
            `);
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    createRestaurant
}