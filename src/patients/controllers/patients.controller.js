import {register,createReportForPatient,getAllReportsForPatient,statusOfAllPatient} from "../models/patients.repository.js"; // Import the PatientRepository model

export const registerPatient = async(req, res,next) =>{
    const { patientName, phoneNumber } = req.body;
    try {
        const patient = await register(patientName, phoneNumber);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const createReport = async(req, res,next) =>{
    const {Id,userId,Status} = (req.params.id,req.user.id, req.body.status)
    try {
        const patient = await createReportForPatient(Id,userId,Status);
        res.status(200).json(patient);
    } catch (error) {
            console.log("error", error)
            res.status(500).json({ message: 'Internal server error' });
        }
}
    export const getAllReports = async(req, res, next)=> {
        const { id } = req.params;
        try {
            const reports = await getAllReportsForPatient(id);
            res.json(reports);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

export const statusOfAllPatients = async(req, res, next)=>{
    try {
        const result = await statusOfAllPatient(req.params.status)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }
}
