const express=require("express")

const router=express.Router()

const {
    createProject,
    getProjects,
    getSingleProject,
    updateProject,
    deleteProject
}=require("../controllers/project.controller")

const {authMiddleware}=require("../middleware/authMiddleware")

router.post("/",authMiddleware,createProject)
router.get("/",authMiddleware,getProjects)
router.get("/:id",authMiddleware,getSingleProject)
router.patch("/:id",authMiddleware,updateProject)
router.delete("/:id",authMiddleware,deleteProject)

module.exports=router