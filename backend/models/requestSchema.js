const mongoose= require("mongoose");

const requestSchema= new mongoose.Schema({
    itemId: mongoose.Schema.Types.ObjectId,
    category: String,
    ownedBy: String,
    requestedBy: String,
    quantity: Number,
    requestTime: {
        "Start": Date,
        "End": Date
    },
    inTime: String,
    outTime: String,
    requestStatus: String,
    remarks: String
});

module.exports=(mongoose.model("Request", requestSchema));