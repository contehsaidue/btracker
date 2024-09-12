// getting-started.js
const mongoose = require('mongoose');

const MongoDBConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://secantchase:%40Saiduconteh55892@cluster0.m1pa2hn.mongodb.net/budgettracker');
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

MongoDBConnection(); // Ensure to call the function to establish the connection
