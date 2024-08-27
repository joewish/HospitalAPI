import mongoose from "mongoose";  // Import the mongoose library
import Patient from "./patients.schema.js";  // Import the Patient schema
import Report from "./patientReport.schema.js";  // Import the Report schema
import { ObjectId } from "mongoose";  // Import ObjectId from mongoose


// Define and export the PatientRepository class
export const register = async(name, phoneNumber)=>{
        // Create a new patient with the provided name and phone number and save it to the database
        return await Patient({patientName : name, phoneNumber: phoneNumber}).save();
    }

    // Method to create a report for a patient
    export const createReportForPatient = async(patientId,doctorId, status) =>{
        // Find the patient by ID
        const patient = await Patient.findById(patientId);
        if(!patient){
            // Return an error message if the patient does not exist
            return ("no Pateint is available with this Id")
        }else{
            // Create a new report with the provided doctor ID, patient ID, and status
            const newReport = {
                doctorId : new mongoose.Types.ObjectId(doctorId),
                patientId: new mongoose.Types.ObjectId(patientId),
                status: status
            }
             // Save the new report to the database
            const savedReport = await Report(newReport).save();
            // Add the saved report's ID to the patient's report array and save the patient
            patient.report.push(savedReport._id);
            await patient.save();
        }
         // Populate the 'report' field
        // Populate the 'report' field and return the patient with sorted reports by date in ascending order     
        return await patient.populate({ path: 'report', options: { sort: { date: 'asc' } } });
    }
    
    // Method to get all reports for a patient
    export const getAllReportsForPatient = async(patientId) =>{
         // Find the patient by ID and populate the 'report' field
        const patient = await Patient.findById(patientId).populate('report');
        return patient; // Return the patient with all reports
    }

    // Method to get all patients with a specific status
    export const statusOfAllPatient = async(status)=>{
        // Find all reports with the given status and populate the 'patientId' field
        const reports = await Report.find({ status }).populate('patientId');
        return reports; // Return the reports
}