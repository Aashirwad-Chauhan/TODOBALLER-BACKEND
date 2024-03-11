import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = async(req, res, next)=>{
    const id = "myid";
    const {token} = req.cookies;
    // console.log(token);

    if(!token) return next(new ErrorHandler("Baller not logged in!", 404));
    // if(!token) return res.status(404).json({
    //     success:false,
    //     message:"Baller not logged in!",
    // });
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData._id);

    next();
};