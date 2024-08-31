// imports 
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(".env") });

export const doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    }
});

// Middleware to hash the user's password before saving using bcrypt
doctorSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;  
        next()
    } catch (error) {
        next(error); 
    }
});

// Method to compare user-entered password with the hashed password in the database
doctorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate a JWT token for the user
doctorSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_Secret, {
        expiresIn: process.env.JWT_Expire,
    });
};

