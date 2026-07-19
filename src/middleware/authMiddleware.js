const jwt=require('jsonwebtoken')
const userModel=require('../models/user.model')

async function authMiddleware(req,res,next){
    try{
        const authHeader=req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message:"UnAuthorized, Please Login Again"
            })
        }

        const token=authHeader.split(" ")[1]

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        

        const user=await userModel.findById(decoded.id)

        if(!user){
            return res.status(401).json({
                message:"User no longer exists"
            })
        }

        req.user=user
        next()
    }catch(error){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

async function getCurrentUser(req,res){
    return res.status(200).json({
        user:req.user
    })
}

module.exports={
    authMiddleware,
    getCurrentUser
}