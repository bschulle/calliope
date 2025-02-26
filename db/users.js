const client = require(`./client.js`);
const bcrypt = require(`bcrypt`);

const createUser = async(newUser, newPassword) =>{
    try{
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        
    
        await client.query(`
            INSERT INTO users (username, password)
            VALUES('${newUser}', '${encryptedPassword}');
            `);
    }catch(err){
        console.log(err);
    }
    
}

module.exports = {
    createUser
}