const UserModel = require('@/models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class User {
    constructor(param) {
        this.param = param
    }

    async create() {
        try {
            const encryptedPassword = await this.passwordEncrytion(this.param.password)
            const queryObj = { ...this.param, password: encryptedPassword }

            return await UserModel.create(queryObj)
        } catch (error) {
            throw new Error(error)
        }

    }

    async passwordEncrytion(password) {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_LENGTH));
        return await bcrypt.hash(password, salt)
    }


    comparePassword() {
        const { password, confirm_password } = this.param

        if (!password || !confirm_password) {
            throw new Error("Missing Password Param")
        }

        if (password !== confirm_password) {
            throw new Error("Password not equal")
        }

    }

    async validAccount() {
        const { email_address } = this.param
        const user = await UserModel.findOne({ email_address })

        if (user) {
            return user
        }

        throw new Error("Invalid Account")
    }

    async updateAccount(ref_id) {
        try {
            return await UserModel.findOneAndUpdate({ ref_id }, this.param, {
                new: true,
                runValidators: true,
                select: "-password"
            })

        } catch (error) {
            throw new Error(error)
        }

    }

    //To do, password didnt update.
    async updatePassword(ref_id) {
        try {
            const { new_password } = this.param
            const encryptedNewPassword = await this.passwordEncrytion(new_password)

            return await UserModel.findOneAndUpdate({ ref_id }, { password: encryptedNewPassword }, {
                new: true,
                runValidators: true,
            })


        } catch (error) {
            console.error("error", error)
            throw new Error(error)
        }

    }

    async findAccountById(ref_id) {
        const user = await UserModel.findOne({ ref_id }).select("-password")

        if (user) {
            return user
        }

        throw new Error("Invalid Account")
    }

    async verifyPassword(user) {
        const { password } = this.param
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error("Invalid Crendentials")
        }

        return true
    }

    generateJWT(paylaod, time, unit) {
        return jwt.sign(paylaod, process.env.TOKEN, { expiresIn: `${time}${unit}` })
    }

}

module.exports = User