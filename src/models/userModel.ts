import mongoose from "mongoose";
import { StrictMode } from "react";

interface IUser {
    _id?:mongoose.Types.ObjectId
    name:string
    email:string
    password?:string
    mobile?:string
    role:"User" | "Delivery Boy" | "Admin"
    image?:string
}

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:false,
    },
    mobile:{
        type:String,
        required:false
    },
    role:{
        type:String,
        enum:["User","Delivery Boy","Admin"],
        default:"User"
    },
    image:{
        type:String,
        required:false

    }


},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User",userSchema)
export default User
