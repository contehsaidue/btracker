const express = require("express");
const ExpenseController = require("../controllers/ExpenseController");

const router = express.Router();

// Routes for Expense Controller

router.post('/create', ExpenseController.createExpense);
router.get('/all', ExpenseController.getAllExpense);
router.get('/byId/:id', ExpenseController.getExpenseById);
router.put('/update/:id', ExpenseController.updateExpenseById);
router.delete('/delete/:id', ExpenseController.deleteExpenseById);

module.exports = router;
