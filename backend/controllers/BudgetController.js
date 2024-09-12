const Budget = require("../models/Budget");

// Budget Controllers

    const createBudget = async (req, res) => {

        try {
          // Get data from the request body
          const budget = req.body.budget;

          console.log(req.body)

          // Check for missing required fields
          if (!budget) {
            return res.status(400).json({ error: 'Missing required field: Budget field is required' });
          }
      
          // Create budget
          const newBudget = await Budget.create({
            budget
          });
      
          res.status(201).json({ message: 'Budget created successfully', budget: newBudget });
        } catch (error) {
          res.status(500).json({ error: 'Failed to create budget', message: error.message });
        }
      };
      


const getAllBudget = async (req, res) => {

  try {
    // Find all the Budgets
    const budget = await Budget.find();

    // Respond with items
    res.json({ budget });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
};


const getBudgetById = async (req, res) => {

  const budgetId = req.params.id; // Get ID off the URL

  // Find the budget using that ID
  const budget = await Budget.findById(budgetId);

  // Respond with the fetched book
  res.json({ budget });
};

const updateBudgetById = async (req, res) => {

  // Get ID from the URL
  const budgetId = req.params.id;

  // Get data from the request body
  const budget = req.body.budget;
  

  // Update the record
  await Budget.findByIdAndUpdate(budgetId, {
    budget: budget
  });

  // Find and update book
  const updatedBudget = await Budget.findById(budgetId);

  // Respond with the updated book
  res.json({ budget: updatedBudget });
};


const deleteBudgetById = async (req, res) => {
  // Delete Budget Logic

  // Get ID from the URL
  const budgetId = req.params.id;

  // Convert budgetId to ObjectId
  const budgetObjectId = mongoose.Types.ObjectId(budgetId);

  // Find and delete budget using the correct field '_id'
  await Budget.deleteOne({ _id: budgetObjectId });

  // Respond
  res.json({ success: "Record Deleted" });
};


// Exporting all the functions as object
module.exports = {
  createBudget,
  getAllBudget,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById,
};
