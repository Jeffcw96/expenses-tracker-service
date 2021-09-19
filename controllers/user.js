const User = require('@/applications').user
const ExpensesCategory = require('@/applications').expensesCategory
const { ErrorHandler } = require("@/utils");
const { jwtExpiryUnit } = require('@/constants')

exports.createUser = async (req, res) => {
    try {
        const userApp = new User(req.body)
        userApp.comparePassword()
        const user = await userApp.create()
        const fixedCategoryArr = [

        ]

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

exports.verifyUser = async (req, res) => {
    try {
        const userApp = new User(req.body)
        const user = await userApp.validAccount()
        await userApp.verifyPassword(user)


        const payload = {
            ref_id: user.ref_id,
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
        const userApp = new User(req.user)
        const user = await userApp.findAccountById(req.params.id)

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
        const user = await userApp.updateAccount(req.params.id)

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
        const userObj = await userApp.updatePassword(req.params.id)


        res.json({
            status: "success",
            message: "Password updated"
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}