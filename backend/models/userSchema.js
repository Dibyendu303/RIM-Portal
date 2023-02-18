import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name: String,
    mobileNumber: Number,
    club: String,
    outlookID:String
})
module.exports=mongoose.model("User",userSchema);
