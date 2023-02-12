const Item=require("../models/itemSchema.js")

module.exports.download = async (req,res) =>{
    try{
        const item = await Item.findByID(req.body.ID);
        res.status(200).json({"link":item[req.body.type]}); //ToDo:
    }
    catch (err){
        res.send(err);
        console.log(err);
    }
}

module.exports.addItem = (req,res) => {
    const item= req.body;
    item.ownedBy = req.user;
    const newItem= new Item(item);
    try{
        newItem.save()
        res.send(newItem); // Can be removed
    }
    catch(err){
        res.send(err);
        console.log(err);
    }
}

module.exports.listAllItems =async(req,res)=>{
    try{
        const items= await Item.find();
        res.status(201).json(items);
    }
    catch{
        res.send(err);
        console.log(err);
    }
}