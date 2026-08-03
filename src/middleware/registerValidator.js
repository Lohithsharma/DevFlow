const {body}=require("express-validator")

const registerValidator=[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

    body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email"),

    body("password")
    .isLength({min:6})
    .withMessage("Password must be atleast 6 charecters")


]

module.exports=registerValidator