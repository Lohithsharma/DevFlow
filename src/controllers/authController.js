const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function registerUser(req,res){
    try{
        const { name,email,password }=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const isUserExists=await userModel.findOne({email})

        if(isUserExists){
            return res.status(400).json({
                message:"User Already Exists"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const user=new userModel({
            name,
            email,
            password:hashedPassword
        })

        await user.save()
        
        return res.status(201).json({
            message:"User Registered Successfully",
            user
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

async function loginUser(req,res){
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const user=await userModel.findOne({email}).select("+password")

        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        const token=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET
        )

        return res.status(200).json({
            message:"User Logged in Successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

module.exports={
    registerUser,
    loginUser
}