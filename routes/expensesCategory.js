const router = require('express').Router();
const expensesCategoryController = require('@/controllers/expensesCategory')
const expensesCategorySchema = require('@/schema/expensesCategory')
const { inputMiddleware, userMiddleware } = require('@/middleware')

console.log("expensesCategorySchema",expensesCategorySchema.addCategory)
router.route('/')
    .post(userMiddleware.validateUser,
          inputMiddleware.validateInput(expensesCategorySchema.addCategory),
          expensesCategoryController.addCategory)


module.exports = router;
