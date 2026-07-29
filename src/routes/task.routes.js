const express=require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const {createTask,getTasks,getSingleTask,updateTask,deleteTask,assignTask,changeTaskStatus}=require("../controllers/task.controller")

const router=express.Router()

router.get("/",authMiddleware,getTasks)
router.get("/:id",authMiddleware,getSingleTask)

router.post("/",authMiddleware,createTask)

router.patch("/:id",authMiddleware,updateTask)
router.patch("/:id/assign",authMiddleware,assignTask)
router.patch("/:id/status",authMiddleware,changeTaskStatus)

router.delete("/:id",authMiddleware,deleteTask)

module.exports=router