const Item=require("../models/itemSchema.js")

export const download = async (req,res) =>{
    try{
        const item = await Item.findByID(req.body.ID);
        res.status(200).json({"link":item[req.body.type]}); //ToDo:
    }
    catch (err){
        res.send(err);
        console.log(err);
    }
}

export const addItem =async(req,res) => {
    const newItem= new Item(req.body);
    try{
        newItem.save()
        res.json(newItem); // Can be removed
    }
    catch(err){
        res.send(err);
        console.log(err);
    }
}

export const listAllItems =async(req,res)=>{
    try{
        const items= await Item.find();
        res.json(items);
    }
    catch{
        res.send(err);
        console.log(err);
    }
}