// imports 
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import router from './src/doctors/routes/doctor.routes.js';
import router2 from './src/patients/routes/patients.routes.js';
// Load environment variables from .env file
dotenv.config({ path: path.resolve("config","uat.env") });

// express application initialization
const app = express();
app.use(express.json());

app.use(cookieParser())
app.use("/doctors", router);
app.use("", router2);


// Start the server
app.listen(process.env.PORT || 8000, async (error) => {
  if (error) {
    console.log(`server failed with error ${error}`);
  } else {
    await connectDB();
    console.log(`App started successfully`);
  }
});
