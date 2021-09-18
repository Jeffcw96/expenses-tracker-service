class ErrorHandler extends Error {
    constructor(res, status) {
        super()
        this.status = status
        this.res = res
    }

    inputError(message) {
        this.res.status(this.status).json({
            status: "failed",
            message: message
        })
    }
}

module.exports = ErrorHandler