const jwt = require("jsonwebtoken")
const { ErrorHandler } = require("@/utils");

exports.validateUser = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const splitToken = authHeader.split("Bearer ");
        const token = splitToken[1];
        const decoded = jwt.verify(token, process.env.TOKEN)
        req.user = decoded
        next()

    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.message)
    }
}

//To do validate input field here
exports.validateInput = (schema) => async (req, res, next) => {
    try {
        const body = req.body

        //pass abortEarly to return all errors message
        await schema.validate(body, { abortEarly: false })
        next()

    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.message.errors)
    }
}