import multer from 'multer';
import { Response } from "./response.js";
import getDataUri from '../utils/dataUtils.js';
import { v2 as cloudinary } from 'cloudinary'

const uploadFormData=async(req,res)=>{

    console.log("Upload Data")

    try{

        const file=req.file;
        const fileUri=getDataUri(file)
        const myCloud=await cloudinary.uploader.upload(fileUri.content)
        console.log(myCloud);

    return res.status(200).json(Response(true,"Image Uploaded Successfully",{data:myCloud}))
    }catch(err){
        return res.status(401).json(Response(false, err.message, {}));
    }
}

const getData=(req,res)=>{
    return res.status(200).json(Response(true,"Image Uploaded Successfully",{}))
}

export {uploadFormData,getData}