// imports
import express  from "express";
import {register,login,logout} from "../controllers/doctors.controller.js";
// routes intilaization
const router = express.Router();

// route for registering a new doctor
router.post('/register', register);

// route for logging in a doctor
router.post('/login',login);
// route for logging out a doctor
router.post('/logout',logout);

// Export the router router
export default router;