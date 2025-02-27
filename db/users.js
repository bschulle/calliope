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

const getUser = async(loginName, loginPassword) => {
    try{
        const { rows } = await client.query(`
            SELECT * FROM users
            WHERE username='${loginName}';
            `);

        const hashedPassword = rows[0].password;
        
        const isPasswordMatch = await bcrypt.compare(loginPassword, hashedPassword);
        console.log(isPasswordMatch);

        // console.log(rows);
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    createUser,
    getUser
}