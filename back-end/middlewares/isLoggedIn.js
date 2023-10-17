import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import 'dotenv/config';

const isLoggedIn = asyncHandler(async (req,res,next) =>{
    const token=req.headers.authorization;
    if(token){ 
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded.id);
            if(user){
                req.user=user;
                next();
            }
            return res
            .status(400)
            .json("User not loggedin");
        } catch (error) {
            return res
            .status(400)
            .json(err.message);
        }
    }
    return res
    .status(401)
    .json("Access Denied, No token provided");
   
})

export { isLoggedIn };