const Task=require("../models/task.model")
const Project=require("../models/project.model")
const User=require("../models/user.model")

const createTask=async (req,res)=>{
    try{
        const {title,description,projectId,assignedTo,priority,dueDate,estimatedHours,labels}=req.body
        
        const project=await Project.findById(projectId)

        if(!project){
            return res.status(404).json({
                message:"Project not found"
            })
        }

        if(assignedTo){
            const user=await User.findById(assignedTo)
            if(!user){
                return res.status(404).json({
                    message:"Assigned user not found"
                })
            }
        }

        const task=await Task.create({
            title,
            description,
            project:projectId,
            assignedTo,
            createdBy:req.user._id,
            priority,
            dueDate,
            estimatedHours,
            labels
        })
        return res.status(201).json({
            message:"Task created Successully",
            task
        })

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const getTasks=async (req,res)=>{
    try{
        const tasks=await Task.find()
        .populate("project","name")
        .populate("assignedTo","name email")
        .populate("createdBy","name email")

        return res.status(200).json(tasks)
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const getSingleTask=async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id)
        .populate("project","name")
        .populate("assignedTo","name email")
        .populate("createdBy","name email")

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        return res.status(200).json(task)
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const updateTask=async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        const {
            title,
            description,
            priority,
            dueDate,
            estimatedHours,
            labels
        }=req.body

        task.title=title || task.title
        task.description=description || task.description
        task.priority=priority || task.priority
        task.dueDate=dueDate || task.dueDate
        task.estimatedHours=estimatedHours ?? task.estimatedHours
        task.labels=labels || task.labels

        await task.save()

        return res.status(200).json({
            message:"Task updated successfully",
            task
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}
const deleteTask=async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        await task.deleteOne()

        return res.status(200).json({
            message:"Task deleted successfully"
        })  
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const assignTask=async (req,res)=>{
    try{
        const {assignedTo}=req.body
        const task=await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        const user=await User.findById(assignedTo)

        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        task.assignedTo=assignedTo

        await task.save()

        return res.status(200).json({
            message:"Task assigned successfully",
            task
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const changeTaskStatus=async (req,res)=>{
    try{
        const {status}=req.body
        const task=await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }
        task.status=status

        if(status=="Done"){
            task.completedAt=new Date()
        }else{
            task.completedAt=null   
        }
        await task.save()

        return res.status(200).json({
            message:"Task status updated successfully",
            task
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports={
    createTask,
    getTasks,
    getSingleTask,
    updateTask,
    deleteTask,
    assignTask,
    changeTaskStatus
}