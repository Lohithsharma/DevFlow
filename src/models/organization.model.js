const mongoose=require("mongoose")

const organizationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        minlength:[3,"Name should be at least 3 characters"],
        maxlength:[50,"Name should be at most 50 characters"]
    },
    description:{
        type:String,
        default:""
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},{
    timestamps:true
})

module.exports=mongoose.model("Organization",organizationSchema)