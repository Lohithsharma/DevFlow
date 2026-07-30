const Comment=require("../models/comment.model")
const Task=require("../models/task.model")

const createComment=async (req,res)=>{
    try{
        const {content,taskId}=req.body
        if(!content || !content.trim()){
            return res.status(400).json({
                success:false,
                message:"Comment content is required"
            })
        }

        const task=await Task.findById(taskId)

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        const comment=await Comment.create({
            content,
            task:taskId,
            createdBy:req.user._id
        })

        return res.status(201).json({
            message:"Comment added successfully",
            comment
        })

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
    
}

const getCommentsByTask=async (req,res)=>{
    try{   
        const {taskId}=req.params
        const task=await Task.findById(taskId)
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        const comments=await Comment.find({task:taskId})
            .populate("createdBy","name email")
            .sort({createdAt:1})

        return res.status(200).json({
            count:comments.length,
            comments
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}


const updateComment=async (req,res)=>{
    try{
        const {id} = req.params
        const {content}=req.body

        const comment=await Comment.findById(id)

        if(!comment){
            return res.status(404).json({
                message:"Comment not found"
            })
        }

        if(comment.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"you are not authorized to update this comment"
            })
        }

        if(!content || !content.trim()){
            return res.status(400).json({
                message:"Comment content is required"
            })
        }

        comment.content=content
        comment.edited=true
        comment.editedAt=new Date()

        await comment.save()

        return res.status(200).json({
            message:"Comment updated Successfully",
            comment
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const deleteComment=async (req,res)=>{
    try{
        const {id}=req.params
        const comment=await comment.findById(id)
        if(!comment){
            return res.status(404).json({
                message:"Comment not found"
            })
        }

        if(comment.createdAt.toString()!==req.user._id.toString()){
            return res.status(403).json({
                message:"You are not authorized to delete this comment"
            })
        }

        await comment.deleteOne()

        return res.status(200).json({
            message:"Comment Deleted Successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports={
    createComment,
    getCommentsByTask,
    updateComment,
    deleteComment
}