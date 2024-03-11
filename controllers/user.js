import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookies } from "../utils/features.js";

//Old project-------------------------------------------------------------------------------------------
// export const allUser =  async(req, res)=>{
//     const users = await user.find({});
//     // const baller = req.query.keyward;
//     // console.log(baller);

//     res.json({
//         success:true,
//         users,
//     });
// };    

// export const newUser = async(req, res)=>{
//     const {name, email, password} = req.body;
//     await user.create({
//         name, 
//         email, 
//         password,    
//     });
    
//     res.status(201).cookie("khalo", "biscut").json({
//         success:true,
//         message:"User Registered!",
//     })
// };

// export const userById = async(req, res)=>{
//     const {id} = req.params; // if you want to send data by params(prefrence get, dynamic url)
//     const baller = await user.findById(id);

//     res.json({
//         success:true,
//         baller,
//     });
// };

// export const staticBaller = (req, res)=>{
//     res.json({
//         success:true,
//         message:"All the dynamics routes must be declared at the last such that special url don't get disturbed.",
//     });
// };

// export const updateUser = async(req, res)=>{
//     const {id} = req.params; // if you want to send data by params(prefrence get, dynamic url)
//     const baller = await user.findById(id);

//     res.json({
//         success:true,
//         message:"Details Updated!",
//     });
// };

// export const deleteUser = async(req, res)=>{
//     const {id} = req.params; // if you want to send data by params(prefrence get, dynamic url)
//     const baller = await user.findById(id);
//     // await baller.remove();

//     res.json({
//         success:true,
//         message:"Baller Deleted!",
//     });
// };



//The method below is also same, but we are using query(params), and in this, body(get only, static url)
// export const userById = async(req, res)=>{
//     const {id} = req.body; // if you want to send data by body(prefrence: post)
//     const baller = await user.findById(id);

//     res.json({
//         success:true,
//         baller,
//     });
// }



// New Project--------------------------------------------------------------------------------------------
export const userLogin = async(req, res, next)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");
    
        if(!user) return next(new ErrorHandler("Baller doesn't exists!", 404));
        // if(!user) return res.status(404).json({
        //     success:false,
        //     message:"Baller doesn't exists!",
        // });
    
        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch) return next(new ErrorHandler("Baller entered a wrong password!", 404));    
        // if(!passMatch) return res.status(404).json({
        //     success:false,
        //     message:"Baller entered a wrong password!",
        // });
    
        setCookies(user, res, `Hola, Baller ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};
   
export const newUser = async(req, res, next)=>{
    try {
        const {name, email, password} = req.body;
        let user = await  User.findOne({email});
    
        if(user) return next(new ErrorHandler("Baller already exists!", 400));
        // if(user) return res.status(404).json({
        //     success:false,
        //     message:"Baller already exists!",
        // });
    
        const hash = await bcrypt.hash(password, 10);
        user = await User.create({name, email, password:hash});
    
        setCookies(user, res, "Baller Registered!", 201);
    } catch (error) {
        next(error);
    }
};

export const myProfile = (req, res)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    })
};

export const userLogout = (req, res)=>{
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure:process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    }).json({
        success:true,
    })
};



