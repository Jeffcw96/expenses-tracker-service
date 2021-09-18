const ExpensesCategoryModel = require("@/models/ExpensesCategory")

class ExpensesCategory {
    constructor(param) {
        this.param = param
    }

    async addCategory(value) {
        try {
            return await ExpensesCategoryModel.create(this.param)
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllCategory(user_ref_id) {
        try {
            const userRefId = this.userRefId(user_ref_id)
            return await ExpensesCategoryModel.find({ user_ref_id: userRefId })
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCategory(user_ref_id, ref_id) {
        try {
            const userRefId = this.userRefId(user_ref_id)
            console.log("here", userRefId, ref_id)
            if (!ref_id || !userRefId) throw new Error("Ref Id Not found")
            const category = await ExpensesCategoryModel.findOne({ user_ref_id: userRefId, ref_id })
            if (!category) throw new Error("Invalid expenses category record")

            return category
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateCategory(user_ref_id, ref_id) {
        try {
            const userRefId = this.userRefId(user_ref_id)
            if (!ref_id || !userRefId) throw new Error("Ref Id Not found")
            const category = await ExpensesCategoryModel.findOneAndUpdate({ user_ref_id: userRefId, ref_id }, this.param, {
                new: true
            })

            if (!category) throw new Error("Invalid expenses category record")

            return category
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteCategory(user_ref_id, ref_id) {
        try {
            const userRefId = this.userRefId(user_ref_id)
            if (!ref_id || !userRefId) throw new Error("Ref Id Not found")
            return await ExpensesCategoryModel.findOneAndDelete({ user_ref_id: userRefId, ref_id })
        } catch (error) {
            throw new Error(error)
        }
    }

    userRefId(user_ref_id) {
        return user_ref_id || this.param.user_ref_id
    }

}

module.exports = ExpensesCategory
