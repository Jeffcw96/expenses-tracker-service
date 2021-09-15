const jwt = require("jsonwebtoken")
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