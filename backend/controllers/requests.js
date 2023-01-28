const Request = require("../models/requestSchema.js");

export const getSentRequests= async(req, res)=>{
    try{
        const allRequests= await Request.find({requestedBy: req.body.requestedBy});
        res.json(allRequests);
    }
    catch(err){
        res.send(err);
        console.log(err);
    }
}
export const getReceivedRequests= async(req, res)=>{
    try{
        const allRequests= await Request.find({ownedBy: req.body.requestedBy});
        res.json(allRequests);
    }
    catch(err){
        res.send(err);
        console.log(err);
    }
}

export const newRequest = async(req,res)=>{
    const newRequest= new Request(req.body);
    try{
        newRequest.save();

    }
    catch (err){
        res.send(err);
        console.log(err);
    }
}

