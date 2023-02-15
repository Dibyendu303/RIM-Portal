require('dotenv').config()
const express= require("express");
const jwt = require('jsonwebtoken');
const itemRouter = express.Router();
const {download, addItem, listAllItems} = require("../controllers/item.js");

const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
        });
    }
}
itemRouter.route("/")
    .post(authenticateToken, addItem)
    .get(authenticateToken, listAllItems);
itemRouter.get("/download", authenticateToken, download);
module.exports = itemRouter;

