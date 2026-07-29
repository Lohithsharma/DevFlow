const Project=require("../models/project.model")
const Organization=require("../models/organization.model")

const createProject=async (req,res)=>{
    try{
        const {name,description,organizationId,projectLead}=req.body
        const organization=await Organization.findById(organizationId)
        if(!organization){
            return res.status(404).json({
                message:"Organization not found"
            })
        }

        const project=await Project.create({
            name,
            description,
            organization:organizationId,
            createdBy:req.user._id,
            projectLead,
            members:[projectLead]
        })

        return res.status(201).json({
            message:"Project Created Successfully",
            project
        })
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const getProjects=async (req,res)=>{
    try{
        const projects=await Project.find()
        .populate("organization","name")
        .populate("createdBy","name email")
        .populate("projectLead","name email")
        .populate("members","name email")

        return res.status(200).json(projects)
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const getSingleProject=async (req,res)=>{
    try{
        const project=await Project.findById(req.params.id)
        .populate("organization","name")
        .populate("createdBy","name email")
        .populate("projectLead","name email")
        .populate("members","name email")

        if(!project){
            return res.status(404).json({
                message:"Project not found"
            })
        }

        return res.status(200).json(project)
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const updateProject=async (req,res)=>{
    try{
        const {name,description,status,projectLead}=req.body

        const project=await Project.findById(req.params.id)

        if(!project){
            return res.status(404).json({
                message:"Project not found"
            })
        }

        if(project.createdBy.toString()!==req.user._id.toString()){
            return res.status(403).json({
                message:"Only creator can update the project"
            })
        }

        project.name=name || project.name
        project.description=description || project.description
        project.status=status || project.status
        project.projectLead=projectLead || project.projectLead

        await project.save()

        return res.status(200).json({
            message:"Project Updated Successfully",
            project
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const deleteProject=async (req,res)=>{
    try{
        const project=await Project.findById(req.params.id)
        if(!project){
            return res.status(404).json({
                message:"project not found"
            })
        }
        if(project.createdBy.toString()!==req.user._id.toString()){
            return res.status(403).json({
                message:"Only creator can delete the project"
            })
        }

        await project.deleteOne()
        return res.status(200).json({
            message:"project deleted successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const addProjectMember = async (req,res)=>{
    try{
        const {memberId}=req.body
        const project = await Project.findById(req.params.id)

        if(!project){
            return res.status(404).json({
                message:"Project not found"
            })
        }

        if(project.members.includes(memberId)){
            return res.status(400).json({
                message:"User is already a project member"
            })
        }

        project.members.push(memberId)

        await project.save()

        return res.status(200).json({
            message:"Member added successfully",
            project
        })
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const removeProjectMember=async (req,res)=>{
    try{
        const {memberId}=req.params
        const project=await Project.findById(req.params.id)

        if(!project){
            return res.status(404).json({
                message:"project not found"
            })
        }

        project.members=project.members.filter(
            (member)=>member.toString()!==memberId
        )

        await project.save()
        return res.status(200).json({
            message:"member removed successfully",
            project
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports={
    createProject,
    getProjects,
    getSingleProject,
    updateProject,
    deleteProject,
    addProjectMember,
    removeProjectMember
}