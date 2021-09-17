const ExpensesCategory = require('@/applications').expensesCategory
const { ErrorHandler } = require("@/utils");

exports.addCategory = async (req,res)=>{
    try {
        const categoryApp = new ExpensesCategory(req.body)
        await categoryApp.addCategory()
        console.log("hello")
        res.json({
            status: "success"
        })

    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.message)
    }
}