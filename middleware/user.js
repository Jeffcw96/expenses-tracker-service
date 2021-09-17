const jwt = require("jsonwebtoken")
const { ErrorHandler } = require("@/utils");

exports.validateUser = async (req, res, next) => {
    try {
        
        const authHeader = req.header("Authorization");
        const splitToken = authHeader.split("Bearer ");
        const token = splitToken[1];
        const decoded = jwt.verify(token, process.env.TOKEN)
        req.user = decoded
        req.body.user_ref_id = decoded.ref_id
        next()

    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.message)
    }
}

