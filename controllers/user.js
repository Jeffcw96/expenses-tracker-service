const userClass = require('@/applications').user

exports.createUser = (req, res) => {
    try {
        console.log("create User")
        const userApp = new userClass()
        userApp.validatePassword()

        res.send("ok")
    } catch (error) {
        console.log("error create User ", error)
    }
}