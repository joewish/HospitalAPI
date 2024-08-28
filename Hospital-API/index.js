import express from 'express';  // Import the express library
import path from 'path';  // Import the path module for handling file and directory paths
import dotenv from 'dotenv'; // Import dotenv for loading environment variables from a .env file
import cookieParser from 'cookie-parser';  // Import cookie-parser for parsing cookies
import swagger from 'swagger-ui-express'; // Import swagger-ui-express for serving API documentation


import apiDocs from './swagger.json' assert {type: 'json'};  // Import Swagger API documentation in JSON format

import doctorRoute from './src/doctors/routes/doctor.routes.js' // Import doctor routes
import patientRoute from './src/patients/routes/patients.routes.js' // Import patient routes

// Load environment variables from .env file
dotenv.config({ path: path.resolve(".env") });
// Import database connection function
import connectDB from './config/db.js';

// Create an express application
const app = express();

// Serving static files
app.use(express.static("./public"));
// Parse incoming request bodies in JSON format
app.use(express.json());

// Parse cookies attached to the request
app.use(cookieParser())

// Set up Swagger UI for API documentation
app.use("/api-docs",
  swagger.serve,
  swagger.setup(apiDocs))

// Define the route for the root path
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Hospital API</h1>
    <p>Click <a href="http://localhost:3000/api-docs/">here</a> to test the API with Swagger</p>
  `);
})

// Set up routes for doctors and patients
app.use("/doctors", doctorRoute);
app.use("", patientRoute);


// Start the server
app.listen(process.env.PORT || 8000, async (error) => {
  if (error) {
    // Log an error message if the server fails to start
    console.log(`server failed with error ${error}`);
  } else {
    // Connect to the database and log a success message
    await connectDB();
    console.log(`server is running at http://localhost:${process.env.PORT || 3000}`);
  }
});
