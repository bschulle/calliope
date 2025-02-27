require(`dotenv`).config();

const client = require(`./db/client.js`);
client.connect();

const { getUser } = require(`./db/users.js`);

const express = require('express');
const app = express();

app.use(express.json());

app.post (`/api/auth/login`, async(req, res, next) => {
    console.log(req.body);
    const { username, passsword } = req.body;

    const loggedInUser = await getUser(username, passsword);

    res.send(`Logged In`);
});

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Port ${PORT}`);
});