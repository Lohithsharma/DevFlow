const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname, "../uploads"))
    },
    filename:function(req,file,cb){
        const uniqueName=Date.now()+"-"+file.originalname
        cb(null,uniqueName)
    }
})

const fileFilter=(req,file,cb)=>{
    const allowedTypes=[
        "image/png",
        "image/jpeg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/zip"
    ]

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("unsupported file type"),false)
    }
}

const upload=multer({
    storage,
    limits:{
        fileSize:10*1024*1024
    },
    fileFilter
})

module.exports=upload