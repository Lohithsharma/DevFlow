const express=require('express')
const { registerUser,loginUser }=require('../controllers/authController')
const { authMiddleware, getCurrentUser } = require('../middleware/authMiddleware')
const registerValidator=require("../middleware/registerValidator")
const validate=require("../middleware/validate")
const router=express.Router()

router.post('/register',registerValidator,validate,registerUser)
router.post('/login',loginUser)
router.get("/me",authMiddleware,getCurrentUser)
module.exports=router