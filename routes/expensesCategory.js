const router = require('express').Router();
const expensesCategoryController = require('@/controllers/expensesCategory')
const expensesCategorySchema = require('@/schema/expensesCategory')
const { inputMiddleware, userMiddleware } = require('@/middleware');

router.route('/')
    .post(userMiddleware.validateUser,
        inputMiddleware.validateInput(expensesCategorySchema.addCategory),
        expensesCategoryController.addCategory)
    .get(userMiddleware.validateUser, expensesCategoryController.getAllCategory)

router.route('/:id')
    .get(userMiddleware.validateUser, expensesCategoryController.getCategory)
    .put(userMiddleware.validateUser, expensesCategoryController.updateCategory)
    .delete(userMiddleware.validateUser, expensesCategoryController.deleteCategory)



module.exports = router;
