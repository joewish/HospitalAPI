import mongoose from "mongoose";  // Import the mongoose library
import {patientSchema } from "./patients.schema.js";  // Import the Patient schema
import {reportSchema} from "./patientReport.schema.js";  // Import the Report schema 

const PatientModel = mongoose.model("Patient", patientSchema)
const reportModel = mongoose.model("Report", reportSchema)
export const register = async(name, phoneNumber)=>{
        return await PatientModel({patientName : name, phoneNumber: phoneNumber}).save();
    }
    export const createReportForPatient = async(patientId,doctorId, status) =>{
        const patient = await PatientModel.findById(patientId);
        if(!patient){
            return ("no Pateint is available with this Id")
        }else{
            const newReport = {
                doctorId : new mongoose.Types.ObjectId(doctorId),
                patientId: new mongoose.Types.ObjectId(patientId),
                status: status
            }
            const savedReport = await reportModel(newReport).save();
            patient.report.push(savedReport._id);
            return await patient.save();
        }     
        return await PatientModel.populate({ path: 'Report', options: { sort: { date: 'asc' } } });
    }
    
    export const getAllReportsForPatient = async(patientId) =>{
        const patient = await PatientModel.findById(patientId).populate('report');
        return patient; 
    }

    export const statusOfAllPatient = async(status)=>{
        const reports = await reportModel.find({ status }).populate('patientId');
        return reports;
}