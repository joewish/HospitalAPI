// imports
import express from 'express';
import {registerPatient,createReport,getAllReports,statusOfAllPatients} from '../controllers/patients.controller.js';  // Import the PatientController class
import { auth } from '../../../middlewares/auth.middleware.js';

const router2 = express.Router();
router2.post('/patients/register',auth, registerPatient);
router2.post('/patients/:id/create_report',auth,createReport);
router2.get('/patients/:id/all_reports',auth, getAllReports);
router2.get('/reports/:status', auth,statusOfAllPatients);

export default router2;