const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')

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

module.exports={
    registerUser
}