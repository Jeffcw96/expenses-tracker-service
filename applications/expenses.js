const ExpensesModel = require("@/models/Expenses")

class Expenses {
    constructor(param) {
        this.param = param
    }

    addExpenses(value){
        console.log("add expenses")
    }
}

module.exports = Expenses
