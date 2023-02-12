const Request = require("../models/requestSchema.js");
const Item=require("../models/itemSchema.js")

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
        const allRequests= await Request.find({ownedBy: req.body.ownedBy});
        res.json(allRequests);
    }
    catch(err){
        res.send(err);
        console.log(err);
    }
}

module.exports.acceptRequest= async(req,res)=>{
    try{
        const targetRequest=await Request.findOneAndUpdate(
            {_id:req.body.requestId},
            {requestStatus:"Accepted"}
        );
        const item= await Item.findOneAndUpdate(
            {_id:req.body.itemId},
            {heldBy:targetRequest.requestedBy,status:"Unavailaible"}
        );
        res.json({
            item: item,
            req: targetRequest
        })
        
        

    }
    catch (err){
        res.send(err);
        console.log(err);
    }
}

module.exports.rejectRequest= async(req,res)=>{
    try{
        const targetRequest=await Request.findOneAndUpdate(
            {_id:req.body.requestId},
            {requestStatus:"Rejected"}
        );
    }
    catch (err){
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