const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.SERVER, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })      
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(error);
      }
  ;
}

module.exports = connectDB