// imports
import express from 'express';
import {register,createReport,getAllReports,statusOfAllPatient} from '../controllers/patients.controller.js';  // Import the PatientController class
import { auth } from '../../../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/patients/register',auth, register);
router.post('/patients/:id/create_report',auth,createReport);
router.get('/patients/:id/all_reports',auth, getAllReports);
router.get('/reports/:status', auth,statusOfAllPatient);

export default router;