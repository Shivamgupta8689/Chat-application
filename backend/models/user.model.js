import { text } from "express";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type: String,
        require:true
    },
    profilePic: {
        type: String,
        default: "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
    },
    resetOtp: {
         type: String,
         default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
}, {
    timestamps:true,
})

const User = mongoose.model("User", userSchema)

export default User;