const express=require('express')
const { registerUser,loginUser }=require('../controllers/authController')
const { authMiddleware, getCurrentUser } = require('../middleware/authMiddleware')

const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/me",authMiddleware,getCurrentUser)
module.exports=router