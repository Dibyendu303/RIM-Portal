const Request = require("../models/requestSchema.js");
const Item = require("../models/itemSchema.js");
const User = require("../models/userSchema.js");

module.exports.getSentRequests = async (req, res) => {
    try {
        // const user = await User.findOne({userID: req.user.userID});
        // const allRequests= await Request.find({requestedBy: req.user.club});
        const allRequests = await Request.find({ requestedBy: req.query.user });
        res.json(allRequests);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}
module.exports.getReceivedRequests = async (req, res) => {
    try {
        // const user = await User.findOne({userID: req.user.userID});
        // const allRequests= await Request.find({ownedBy: req.user.club});
        const allRequests = await Request.find({ ownedBy: req.query.user });
        res.json(allRequests);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}

module.exports.acceptRequest = async (req, res) => {
    try {
        // const user = await User.findOne({userID: req.user.userID});
        const targetRequest = await Request.findOneAndUpdate(
            { _id: req.body.requestId },
            // {requestStatus:`Accepted by ${req.user.club}`}

            { requestStatus: `Accepted` }
        );
        newTime = targetRequest.requestTime;
        // newTime = {Start : "2016-05-18T16:00:00Z", End: "2016-05-18T16:00:00Z"}  //Example
        const item = await Item.findOneAndUpdate(
            { _id: targetRequest.itemId },
            { "heldBy": targetRequest.requestedBy, "status": "bcd", $push: { "occupiedTime": newTime } }
        );
        res.json({
            item: item,
            req: targetRequest
        })
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}

module.exports.rejectRequest = async (req, res) => {
    try {
        // const user = await User.findOne({userID: req.user.userID});
        const targetRequest = await Request.findOneAndUpdate(
            { _id: req.body.requestId },
            // {requestStatus:`Rejected by ${req.user.club}`}
            { requestStatus: `Rejected` }
        );
        res.json(targetRequest);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}
module.exports.newRequest = (req, res) => {
    const request = req.body;
    // request.requestedBy = req.user.club;
    const newRequest = new Request(request);
    try {
        newRequest.save();
        res.send(newRequest);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}