require('dotenv').config()
const express= require("express");
const jwt = require('jsonwebtoken');
const requestRouter = express.Router();
const { getSentRequests, getReceivedRequests, newRequest } = require("../controllers/requests.js");
const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.send(err);
        else{
            req.user = user;
            next();
        }
        });
    }
}

requestRouter.get("/sent", authenticateToken, getSentRequests)
requestRouter.get("/received", authenticateToken, getReceivedRequests);
requestRouter.post("/", authenticateToken, newRequest);
module.exports = requestRouter;

