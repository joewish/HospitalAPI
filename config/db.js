import mongoose from "mongoose";
import path from 'path';
import dotenv from 'dotenv'; // Import dotenv for loading environment variables from a .env file

// Load environment variables from .env file
dotenv.config({ path: path.resolve(".env") });


// function to connect to the MongoDB database
const connectDB = async()=>{
    try {
         //console.log(process.env.DB_URL)
         await mongoose.connect(process.env.DB_URL || "mongodb://0.0.0.0:27017/hospital_api");
         console.log("MongoDB connected using mongoose");
    } catch (error) {
        console.log(error);
    }
}

// Export the connectDB function as the default export
export default connectDB;