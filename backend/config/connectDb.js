const mongoose = require('mongoose');

const connectDB = async () => {
  
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(() =>
        console.log("MongoDB connected successfully"));
    
}

module.exports = connectDB;