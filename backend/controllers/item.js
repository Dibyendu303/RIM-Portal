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
    const data= req.body;
    data.ownedBy = req.user?req.user:data.ownedBy;  // Change after authentication setup complete
    const item= {
        "name": data.name,
        "category": data.category,
        "ownedBy": data.ownedBy,
        "heldBy": data.heldBy? data.heldBy:data.ownedBy,
        "quantity": data.quantity,
        "purchasedOn": data.purchasedOn,
        "bill": data.bill,
        "sanctionLetter": data.sanctionLetter,
        "purchaseOrder": data.purchasedOrder,
        "status": data.status,
        "remarks": data.remarks,
        "occupiedTime": []
    }
    const newItem= new Item(item);
    try{
        newItem.save()
        res.status(201).send({result:"Success", item: newItem}); // Can be removed
    }
    catch(err){
        res.status(500).send(err);
        console.log(err);
    }
}

module.exports.listAllItems =async(req,res)=>{
    try{
        const items= await Item.find();
        res.status(201).json(items);
    }
    catch{
        res.status(500).send(err);
        console.log(err);
    }
}

module.exports.deleteItem = async (req,res)=>{
    const id=req.body.ID;

    try{
        Item.findByIdAndDelete(id);
        res.status(200).send({ result: "Success"});
    }
    catch{
        res.send(err);
        console.log(err);
    }
}

// module.exports.returnItem = async (req,res)=>{
     
// }