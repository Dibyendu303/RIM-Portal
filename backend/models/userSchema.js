import mongoose from "mongoose";
const userScehma= new mongoose.Schema({
    name: String,
    mobileNumber: Number,
    club: String,
    outlookID:String
})
module.exports=mongoose.model("User",userSchema);
