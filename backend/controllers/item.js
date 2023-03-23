const Item=require("../models/itemSchema.js")
const {
  ref,
  uploadBytes,
  deleteObject,
} = require("firebase/storage");
const storage = require("../config/config.js");

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

module.exports.addItem = async (req,res) => {
    const timestamp = Date.now();
    // const fileNameBill = `${req.files['bill'][0].originalname.split(".")[0]}_${timestamp}.${req.files['bill'][0].originalname.split(".")[1]}`;
    // const fileNameSanctionLetter = `${req.files['sanctionLetter'][0].originalname.split(".")[0]}_${timestamp}.${req.files['sanctionLetter'][0].originalname.split(".")[1]}`;
    var billUrl="";
    var sanctionLetterUrl="";
    // await uploadBytes(ref(storage, fileNameBill), req.files['bill'][0].buffer, { contentType: req.files['bill'][0].mimetype, name: fileNameBill })
    // .then((snapshot) => {
    //   billUrl =
    // `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/${fileNameBill}?alt=media`;
    // })
    // .catch((error) => console.log(error.message));
    // await uploadBytes(ref(storage, fileNameSanctionLetter), req.files['sanctionLetter'][0].buffer, { contentType: req.files['sanctionLetter'][0].mimetype, name: fileNameSanctionLetter })
    // .then((snapshot) => {
    //   sanctionLetterUrl =
    // `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/${fileNameSanctionLetter}?alt=media`;
    // })
    // .catch((error) => console.log(error.message));
    const data= req.body;
        data.ownedBy = req.user?req.user:data.ownedBy;  // Change after authentication setup complete
        const item= {
            "name": data.name,
            "category": data.category,
            "ownedBy": data.ownedBy,
            "heldBy": data.heldBy? data.heldBy:data.ownedBy,
            "quantity": data.quantity,
            "purchasedOn": data.purchasedOn,
            "bill": billUrl,
            "sanctionLetter": sanctionLetterUrl,
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
        console.log("helloo")
        const items= await Item.find();
        res.status(201).json(items);
    }
    catch{
        res.status(500).send(err);
        console.log(err);
    }
}

module.exports.deleteItem = async (req,res)=>{
    try {
        const id=req.body.ID;
        // console.log("Delete item api called ", id);
        Item.findByIdAndRemove(id, (err, doc) => {
            console.log(doc)
            if(doc){
                if (!err) {
                    res.status(200).send({ result: "Success" });
                } else {
                    res.send(err);
                    console.log(err);
                }
            }
            else res.status(404).send({result: "Item Not Found"})
        })
    }
    catch {
        res.send(err);
        console.log(err);
    }
}

module.exports.returnItem = async (req,res)=>{
     try{
        const item = await Item.findOneAndUpdate(
            {_id : req.body.itemId},
            {heldBy: req.body.heldBy}
        );
        if(item){
            res.status(200).send({result:"Success", item:item});
        }
        else res.status(404).send({result:"Item Not Found"})

     }
     catch(err){
        res.status(500).send(err);
     }
}