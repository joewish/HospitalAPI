// imports 
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import router from './src/doctors/routes/doctor.routes.js';
import router2 from './src/patients/routes/patients.routes.js';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type: 'json'};
import expressEjsLayouts from "express-ejs-layouts";
// Load environment variables from .env file
dotenv.config({ path: path.resolve("config","uat.env") });

// express application initialization
const app = express();
app.use(express.json());
app.use("/api-docs",
  swagger.serve,
  swagger.setup(apiDocs))
app.get('/', (req, res) => {
  res.redirect('/api-docs')
 
})
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
