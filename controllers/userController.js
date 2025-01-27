import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config(); 
export function registerUser(req,res){

    const data = req.body
    data.password=bcrypt.hashSync(data.password,10)
    const newUser= new User(data)

    newUser.save().then(()=>{
        res.json({
            message:"User registered successfully"
        })
    }).catch((error)=>{
        res.status(500).json({
            error:"User registration failed"
        })
    })
}

export function loginUser(req,res){
    const data = req.body;
    User.findOne({
        email:data.email})
    .then((user)=>{
       if(user==null){
        res.status(404).json({
            error:"User not found"
        });
       }else{
            

            const isPassWordCoerrect=bcrypt.compareSync(data.password,user.password)
            if(isPassWordCoerrect){
                const token=jwt.sign(
                    {
                        firstname:user.firstname,
                        lastname:user.lastname,
                        email:user.email,
                        role:user.role,
                        profilePicture:user.profilePicture
                    },process.env.JWT_TOKEN
                )
                res.json({message:"User logged in successfully",token:token});
            }else{
                res.status(401).json({
                    error:"Invalid password"
                })
            }
       }
        
    })

}