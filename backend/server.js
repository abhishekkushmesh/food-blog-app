const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/connectDb');
const cors = require('cors'); 
const PORT = process.env.PORT || 3000;
connectDB(); // Connect to MongoDB
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(express.static('public')); // Serve static files from the public directory
app.use('/', require('./routes/user')); // User routes
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use("/recipe",require('./routes/recipe')); 


app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});