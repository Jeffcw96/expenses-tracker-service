const jwt = require("jsonwebtoken")
const {REF_ID,
       NAME,
       EMAIL_ADDRESS,
       PASSWORD,
       BIRTHDAY,
       AVATAR} = require("@/models/user/constant")
const {body, validationResult} = require('express-validator')

exports.validateUser = async (req, res, next) => {
    try {
        console.log("validate User middlerware")
        const authHeader = req.header("Authorization");
        const splitToken = authHeader.split("Bearer ");
        const token = splitToken[1];
        const decoded = jwt.verify(token, process.env.TOKEN)
        req.user = decoded
        next()

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Invalid Token"
        })
    }
}

//To do validate input field here
exports.validateInput = async(req, res, next) => {
    try {                
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                status: "failed",
                message: errors.array()
            })
            return
        }
    
        next()

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}