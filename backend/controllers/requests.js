const Request = require("../models/requestSchema.js");

module.exports.getSentRequests= async(req, res)=>{
    try{
        const allRequests= await Request.find({requestedBy: req.body.requestedBy});
        res.json(allRequests);
    }
    catch(err){
        res.send(err);
        console.log(err);
    }
}
module.exports.getReceivedRequests= async(req, res)=>{
    try{
        const allRequests= await Request.find({ownedBy: req.body.requestedBy});
        res.json(allRequests);
    }
    catch(err){
        res.send(err);
        console.log(err);
    }
}

module.exports.newRequest = (req,res)=>{
    const request = req.body;
    const newRequest= new Request(request);
    try{
        newRequest.save();
        res.send(newRequest);
    }
    catch (err){
        res.send(err);
        console.log(err);
    }
}

