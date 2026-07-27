const express=require("express")

const router=express.Router()

const { createOrganization,getOrganizations,joinOrganization,updateOrganization}=require("../controllers/organization.controller")
const {authMiddleware}=require("../middleware/authMiddleware")

router.post("/",authMiddleware,createOrganization)
router.get("/",authMiddleware,getOrganizations)
router.post("/:id/join",authMiddleware,joinOrganization)
router.patch("/:id",authMiddleware,updateOrganization)

module.exports=router