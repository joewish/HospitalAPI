import mongoose from "mongoose";  // Import the mongoose library
import bcrypt from 'bcrypt'; // Import the bcrypt library for hashing passwords
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for generating tokens
import path from 'path'; // Import the path module
import dotenv from 'dotenv'; // Import the dotenv library to manage environment variables

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(".env") });

// Define the Doctor schema
export const doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true // Username is required
    },
    password: {
        type: String,
        required: true // Password is required
    }
});

// Middleware to hash the user's password before saving using bcrypt
doctorSchema.pre("save", async function (next) {
    try {
        // Hash the password with a salt factor of 12
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;  // Set the hashed password on the user object
        next()
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

// Method to compare user-entered password with the hashed password in the database
doctorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// Method to generate a JWT token for the user
doctorSchema.methods.getJWTToken = function () {
    // Sign the token with the user's ID, a secret key, and an expiration time
    return jwt.sign({ id: this._id }, process.env.JWT_Secret, {
        expiresIn: process.env.JWT_Expire,
    });
};

