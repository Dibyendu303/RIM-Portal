const express = require('express');
const app= express();
app.use(express.json());
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.post('/login', (req, res)=>{
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
    // res.send("hello")
});

app.listen(4000);