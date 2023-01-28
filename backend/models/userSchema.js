import mongoose from "mongoose";
const userScehma= new mongoose.Schema({
    name: String,
    mobileNumber: Number,
    club: String,
    outlookID:String
})
const User=mongoose.model("User",userSchema);
export default User;
