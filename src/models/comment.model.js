const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
        trim:true
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    edited:{
        type:Boolean,
        default:false
    },
    editedAt:{
        type:Date,
        default:null
    }
},{
    timestamps:true
})


module.exports=mongoose.model("Comment",commentSchema)
