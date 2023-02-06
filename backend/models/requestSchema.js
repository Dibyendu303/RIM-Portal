const mongoose= require("mongoose");

const requestSchema= new mongoose.Schema({
    itemName: String,
    category: String,
    ownedBy: String,
    requestedBy: String,
    quantity: Number,
    requestTime: String,
    inTime: String,
    outTime: String,
    requestStatus: String,
    remarks: String
});

module.exports=(mongoose.model("Request", requestSchema));