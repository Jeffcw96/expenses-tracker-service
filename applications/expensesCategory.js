const ExpensesCategoryModel = require("@/models/ExpensesCategory")

class ExpensesCategory {
    constructor(param) {
        this.param = param
    }

    async addCategory(value){
        try {
            return await ExpensesCategoryModel.create(this.param)
        } catch (error) {
            throw new Error(error)
        }        
    }


}

module.exports = ExpensesCategory
