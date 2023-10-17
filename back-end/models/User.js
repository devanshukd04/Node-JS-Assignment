import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema=new Schema({
    first_name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        lowercase: true, // Store the email in lowercase to ensure case-insensitive uniqueness
        trim: true, // Remove leading and trailing whitespace from the email
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email format validation
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

userSchema.methods.generateJWT=function(){
    const token=jwt.sign({
        _id:this._id
    },process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
    return token;
}

export default mongoose.model('User', userSchema);