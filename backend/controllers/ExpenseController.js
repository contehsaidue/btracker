const Expense = require("../models/Expense");
const mongoose = require('mongoose'); // Using commonjs syntax

// Expense Controllers

    const createExpense = async (req, res) => {

        try {
          // Get data from the request body
          const title = req.body.title;
          const amount  = req.body.amount;

          // Check for missing required fields
          if (!title || !amount) {
            return res.status(400).json({ error: 'Missing required field: Expense field is required' });
          }
      
          const newExpense = await Expense.create({ title, amount });

            // Now you can use newExpense for further processing
            res.status(201).json({ message: 'Expense created successfully', expense: newExpense });

        } catch (error) {
          res.status(500).json({ error: 'Failed to create expense', message: error.message });
        }
      };
      


const getAllExpense = async (req, res) => {

  try {
    // Find all the Budgets
    const expense = await Expense.find();

    // Respond with items
    res.json({ expense });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
};

const getExpenseById = async (req, res) => {

  const expenseId = req.params.id; // Get ID off the URL

  const expense = await Expense.findById(expenseId);

  // Respond with the fetched book
  res.json({ expense });
};


const updateExpenseById = async (req, res) => {
  // Get ID from the URL
  const expenseId = req.params.id;

   // Get data from the request body
   const title = req.body.title;
   const amount  = req.body.amount;
  
  // Update the record
  await Expense.findByIdAndUpdate({_id: expenseId}, {title, amount});

  // Send a success response
  return res.status(200).json({ message: "Expense updated successfully." });
};


const deleteExpenseById = async (req, res) => {
  try {
    // Get ID from the URL
    const expenseId = req.params.id;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // Check if the expense exists
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    // Find and delete expense using the correct field '_id'
    const result = await Expense.deleteOne({ _id: expenseId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    // Respond
    res.json({ success: "Record Deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting expense" }); // Inform user about the error
  }
};




// Exporting all the functions as object
module.exports = {
  createExpense,
  getAllExpense,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
};
