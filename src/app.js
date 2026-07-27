const express=require("express")
const authRouter=require('./routes/authRoutes')
const app=express()
const organizationRoutes=require("./routes/organization.routes")
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/organizations",organizationRoutes)
module.exports=app