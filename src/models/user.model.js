const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        minlength:[3,"Name must be atleast 3 charecters"],
        maxlength:[50,"Name must contain atmost 50 charecters"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"password must be atleast 6 charecters"],
        select:false
    },
    avatar:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:"",
        maxlength:[200,"Bio cannot exceeds 200 charecters"]
    },
    role:{
        type:String,
        enum:["Admin","Member"],
        default:"Member"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
}, 
{
    timestamps:true
}
);

const User=mongoose.model("User",userSchema);

module.exports=User