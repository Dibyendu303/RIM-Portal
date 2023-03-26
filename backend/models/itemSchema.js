const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    "name": String,
    "category": String,
    "ownedBy": String,
    "heldBy": String,
    "quantity": Number,
    "purchasedOn": Number,
    "bill": String,
    "sanctionLetter": String,
    "purchaseOrder": String,
    "inspectionReport": String,
    "status": String,
    "remarks": String,
    "occupiedTime": [
        {
            "Start": Number,
            "End": Number
        }
    ]
});

module.exports = mongoose.model("Item", itemSchema);