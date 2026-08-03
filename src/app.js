const express=require("express")
const authRouter=require('./routes/authRoutes')
const app=express()
const helmet=require("helmet")
const cors=require("cors")
const errorHandler=require("./middleware/errorMiddleware")
const apiLimiter=require("./middleware/rateLimiter")
const organizationRoutes=require("./routes/organization.routes")
const projectRoutes=require("./routes/project.routes")
const taskRoutes=require("./routes/task.routes")
const commentRoutes=require("./routes/comment.routes")
const attachmentRoutes=require("./routes/attachment.routes")
app.use(helmet())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(express.json())
app.use("/api",apiLimiter)
app.use("/api/auth",authRouter)
app.use("/api/organizations",organizationRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/attachments",attachmentRoutes)
app.use((req,res)=>{
    return res.status(404).json({
        success:false,
        message:"Route not found"
    })
})
app.use(errorHandler)
module.exports=app