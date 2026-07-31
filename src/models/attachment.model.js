const mongoose=require("mongoose")

const attachmentSchema=new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    fileSize:{
        type:Number,
        required:true
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Attachment",attachmentSchema)