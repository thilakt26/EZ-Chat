import { text } from "express";
import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
       
    }

} ,{timestamps:true})//time stamp has two things 1)createdAt & 2)updatedAt 

const User=mongoose.model("User",userSchema);
export default User;