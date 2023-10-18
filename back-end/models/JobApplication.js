import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const jobApplicationSchema=new Schema({
    user_email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        lowercase: true, // Store the email in lowercase to ensure case-insensitive uniqueness
        trim: true, // Remove leading and trailing whitespace from the email
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email format validation
    },
    number:{
        type: String,
        required: true, 
    },
    addressLine1:{
        type: String,
        required: true, 
    },
    addressLine2:{
        type: String,
        required: true, 
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    pincode:{
        type: String,
        required: true,
    },
    country:{
        type:String,
        required:true
    },
    files:[String],
    job_application:[String]
},{timestamps:true});


export default mongoose.model('JobApplication', jobApplicationSchema);