const User = require('@/applications').user
const { jwtExpiryUnit } = require('@/constants')

exports.validateUser = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const splitToken = authHeader.split("Bearer ");
        const token = splitToken[1];

        const userApp = new User()
        const decoded = userApp.validateJWT(token)
        req.user = decoded
        next()

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Invalid Token"
        })
    }
}


exports.createUser = async (req, res) => {
    try {
        const userApp = new User(req.body)
        userApp.comparePassword()
        await userApp.create()

        res.json({
            status: "success"
        })
    } catch (error) {
        console.log("error create User ", error.message)
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const userApp = new User(req.body)
        const user = await userApp.validAccount()
        await userApp.verifyPassword(user)


        const payload = {
            id: user._id,
            email_address: user.email_address
        }

        const jwtToken = userApp.generateJWT(payload, 5, jwtExpiryUnit.days)

        res.json({
            status: "success",
            message: jwtToken
        })
    } catch (error) {
        console.log("error create User ", error.message)
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        console.log("req", req.user)
        const userApp = new User(req.user)
        const user = await userApp.findAccountById()

        res.json({
            status: "success",
            message: user
        })
    } catch (error) {
        console.log("error create User ", error.message)
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        delete req.body["password"]
        const userApp = new User(req.body)
        const user = await userApp.updateAccount(req.user.id)

        res.json({
            status: "success",
            message: user
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body

        if (!old_password || !new_password) {
            throw new Error("Missing Password Param")
        }

        const queryObj = {
            email_address: req.user.email_address,
            new_password: req.body.new_password,
            password: req.body.old_password
        }
        const userApp = new User(queryObj)
        const user = await userApp.validAccount()
        await userApp.verifyPassword(user)
        const userObj = await userApp.updatePassword(req.user.id)


        res.json({
            status: "success",
            message: userObj
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}