const jwt = require("jsonwebtoken")
const { ErrorHandler } = require("@/utils");

exports.validateInput = (schema) => async (req, res, next) => {
    try {
        const body = req.body
        //pass abortEarly to return all errors message
        await schema.validate(body, { abortEarly: false })
        next()

    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.errors)
    }
}