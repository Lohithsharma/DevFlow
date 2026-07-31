const express=require("express")

const {
    uploadAttachment,
    getAttachmentsByTask,
    downloadAttachment,
    deleteAttachment
}=require("../controllers/attachment.controller")

const {authMiddleware}=require("../middleware/authMiddleware")
const upload=require("../config/multer")

const router=express.Router()

router.post("/",authMiddleware,upload.single("file"),uploadAttachment)

router.get("/task/:taskId",authMiddleware,getAttachmentsByTask)
router.get("/download/:id",authMiddleware,downloadAttachment)
router.delete("/:id",authMiddleware,deleteAttachment)

module.exports=router