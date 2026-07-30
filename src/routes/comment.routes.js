const express=require("express")
const {createComment,getCommentsByTask,updateComment,deleteComment}=require("../controllers/comment.controller")

const {authMiddleware}=require("../middleware/authMiddleware")


const router=express.Router()


router.post("/",authMiddleware,createComment)
router.get("/task/:taskId",authMiddleware,getCommentsByTask)
router.patch("/:id",authMiddleware,updateComment)
router.delete("/:id",authMiddleware,deleteComment)

module.exports=router