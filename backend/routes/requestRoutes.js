require('dotenv').config()
const express= require("express");
const jwt = require('jsonwebtoken');
const requestRouter = express.Router();
const { getSentRequests, getReceivedRequests, newRequest, acceptRequest, rejectRequest } = require("../controllers/requests.js");
const authenticateToken = require('../middleware/authToken.js');


// requestRouter.get("/sent", authenticateToken, getSentRequests)
// requestRouter.get("/received", authenticateToken, getReceivedRequests);
// requestRouter.post("/", authenticateToken, newRequest);
// requestRouter.put("/accept",authenticateToken,acceptRequest);
// requestRouter.put("/reject",authenticateToken,rejectRequest);
requestRouter.get("/sent", getSentRequests)
requestRouter.get("/received", getReceivedRequests);
requestRouter.post("/", newRequest);
requestRouter.put("/accept",acceptRequest);
requestRouter.put("/reject",rejectRequest);
module.exports = requestRouter;