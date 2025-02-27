require(`dotenv`).config();

const express = require('express');
const app = express();

app.use(express.json());

app.post (`/api/auth/login`, (req, res, next) => {
    console.log(req.body);
    res.send(`Logged In`);
});

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Port ${PORT}`);
});