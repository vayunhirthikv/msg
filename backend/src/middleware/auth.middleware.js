import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";

//Check whether the request comes from a logged-in Clerk user, 
// find that user in MongoDB, attach the MongoDB user to req.user, 
// and then allow the request to continue.

export async function protectRoute(req,res,next){
    try {
        const {userId}=getAuth(req);//if we get null means unauthorized user

        if(!userId){
            res.status(401).json({message:"Unauthorized "});
            return;
        }
        const user =await User.findOne({clerkId:userId});
        if(!user){
            res.status(401).json({message:"User profile is not synced yet"});
            return;
        }
        req.user=user;
        next(); //move to the next middleware

    } catch (error) {
        console.log("error in protected middleware",error.message);
        res.status(500).json({message:"internal server error"});
        
    }
}