const Organization=require("../models/organization.model")

async function createOrganization(req,res){
    try{
        const {name,description}=req.body;
        if(!name){
            return res.status(400).json({
                message:"Organization name is required"
            })
        }

        const organization=new Organization({
            name,
            description,
            owner:req.user._id,
            members:[req.user._id]
        });

        await organization.save()

        return res.status(201).json({
            success:true,
            organization
        })
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

async function getOrganizations(req,res){
    try{
        const organizations=await Organization.find()
        .populate("owner","name email")
        .populate("members","name email")

        return res.status(200).json({
            success:true,
            organizations
        })
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

async function joinOrganization(req,res){
    try{
        const organization=await Organization.findById(req.params.id)
        if(!organization){
            return res.status(404).json({
                message:"Organization not found"
            })
        }
        if(organization.members.includes(req.user._id)){
            return res.status(400).json({
                message:"Already a member"
            })
        }
        organization.members.push(req.user._id)
        await organization.save()

        return res.status(200).json({
            sucess:true,
            organization
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

async function updateOrganization(req,res){
    try{
        const organization=await Organization.findById(req.params.id)

        if(!organization){
            return res.status(404).json({
                message:"Organization not found"
            })
        }

        if(organization.owner.toString()!==req.user._id.toString()){
            return res.status(403).json({
                message:"only owner can update"
            })
        }
        organization.name=req.body.name || organization.name
        organization.description=req.body.description || organization.description

        await organization.save()

        return res.status(200).json({
            success:true,
            organization
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }   
}


module.exports={
    createOrganization,
    getOrganizations,
    updateOrganization,
    joinOrganization
}