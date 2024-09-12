// getting-started.js
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    budget: Number
  });

  module.exports = mongoose.model('Budget', budgetSchema);