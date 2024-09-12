const express = require("express");
const BudgetController = require("../controllers/BudgetController");

const router = express.Router();

// Routes for Budget Controller

router.post('/create', BudgetController.createBudget);
router.get('/all', BudgetController.getAllBudget);
//router.get('/:id', BookController.getBookById);
//router.put('/update/:id', BookController.updateBookById);
//router.delete('/delete/:id', BookController.deleteBookById);


module.exports = router;
