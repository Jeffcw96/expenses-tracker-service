const ExpensesCategory = require('@/applications').expensesCategory
const { ErrorHandler } = require("@/utils");

exports.addCategory = async (req, res) => {
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

exports.getAllCategory = async (req, res) => {
    try {
        const categoryApp = new ExpensesCategory(req.body)
        const categories = await categoryApp.getAllCategory(req.user.ref_id)
        res.json({
            status: "success",
            message: categories
        })

    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.message)
    }
}

exports.getCategory = async (req, res) => {
    try {
        const categoryApp = new ExpensesCategory(req.body)
        const category = await categoryApp.getCategory(req.user.ref_id, req.params.id)
        res.json({
            status: "success",
            message: category
        })

    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.message)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const categoryApp = new ExpensesCategory(req.body)
        const category = await categoryApp.updateCategory(req.user.ref_id, req.params.id)
        res.json({
            status: "success",
            message: category
        })


    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.message)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const categoryApp = new ExpensesCategory()
        await categoryApp.deleteCategory(req.user.ref_id, req.params.id)
        res.json({
            status: "success",
        })


    } catch (error) {
        const ErrorHandlerApp = new ErrorHandler(res, 500)
        ErrorHandlerApp.inputError(error.message)
    }
}