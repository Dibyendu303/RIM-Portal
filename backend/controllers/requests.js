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

module.exports.newRequest = async(req,res)=>{
    const newRequest= new Request(req.body);
    try{
        newRequest.save();
    }
    catch (err){
        res.send(err);
        console.log(err);
    }
}

