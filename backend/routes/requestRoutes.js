const express= require("express");
const requestRouter = express.Router();
const { getSentRequests, getReceivedRequests, newRequest } = require("../controllers/requests.js");
requestRouter.get("/sent", getSentRequests)
requestRouter.get("/received", getReceivedRequests);
requestRouter.post("/", newRequest);
module.exports = requestRouter;