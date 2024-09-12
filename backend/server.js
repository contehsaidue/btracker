const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const MongoDBConnection = require('./Config/DBConfig')
MongoDBConnection;

    // Middlewares
    app.use(cors());
    app.use(express.json());
 
    // Importing Routers from routes folder
    const BudgetRoutes = require('./routes/BudgetRoutes');
    const ExpenseRoutes = require('./routes/ExpenseRoutes');

    app.use('/api/budget/', BudgetRoutes);
    app.use('/api/expense/', ExpenseRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})