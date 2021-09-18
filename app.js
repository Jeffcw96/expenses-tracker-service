const dotenv = require('dotenv');
const express = require('express');
const { fork } = require('child_process')
const app = express();
const controllers = require('@/controllers')
const userRouter = require('@/routes').user
const expensesCategoryRouter = require('@/routes').expensesCategory
const DB = require('@/db');

dotenv.config({ path: './config.env' });
DB()

if (process.argv[2] === "--importCurrency") {
    const child = fork('./utils/import/currency')
    child.send("Start")
    child.on('message', (result) => {
        controllers.currency.importCurrency(result)
    })
}

// console.log("testing", utils.currency)
app.use(express.urlencoded())
app.use(express.json());
app.use(express.static(`${__dirname}/public`));


//Routes
app.use('/api/users', userRouter)
app.use('/api/expenses_category',expensesCategoryRouter)


module.exports = app
