const Attachment=require("../models/attachment.model")
const Task=require("../models/task.model")
const fs=require("fs")
const path=require("path")


const uploadAttachment=async (req,res)=>{
    try{
        const {taskId}=req.body
        const task=await Task.findById(taskId)

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        if(!req.file){
            return res.status(400).json({
                message:"No file uploaded"
            })
        }

        const attachment=await Attachment.create({
            fileName:req.file.originalname,
            filePath:req.file.path,
            fileType:req.file.mimetype,
            fileSize:req.file.size,
            task:taskId,
            uploadedBy:req.user._id
        })

        return res.status(201).json({
            message:"Attachment uploaded successfully",
            attachment
        })

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const getAttachmentsByTask=async (req,res)=>{
    try{
        const {taskId}=req.params
        const task=await Task.findById(taskId)

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        const attachments=await Attachment.find({
            task:taskId
        })
        .populate("uploadedBy","name email")
        .sort({createdAt:-1})

        return res.status(200).json({
            count:attachments.length,
            attachments
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const downloadAttachment=async (req,res)=>{
    try{
        const {id}=req.params

        const attachment=await Attachment.findById(id)

        if(!attachment){
            return res.status(404).json({
                message:"Attachment not found"
            })
        }

        return res.download(
            attachment.filePath,
            attachment.fileName
        )
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const deleteAttachment=async (req,res)=>{
    try{
        const {id}=req.params
        const attachment=await Attachment.findById(id)

        if(!attachment){
            return res.status(404).json({
                message:"Attachment not found"
            })
        }

        if(attachment.uploadedBy.toString()!==req.user._id.toString()){
            return res.status(403).json({
                message:"you are not authorized to delete this attachment"
            })
        }

        if(fs.existsSync(attachment.filePath)){
            fs.unlinkSync(attachment.filePath)
        }

        await attachment.deleteOne()

        return res.status(200).json({
            message:"Attachment deleted successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports={
    uploadAttachment,
    getAttachmentsByTask,
    downloadAttachment,
    deleteAttachment
}