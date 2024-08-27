import mongoose from "mongoose";
import {doctorSchema} from "./doctor.schema.js";

const DoctorModel = mongoose.model('doctor', doctorSchema);
export const registerDoctor =  async(body)=>{
    try{
        return await DoctorModel(body).save();
    }catch(err){
        throw new Error(err);
    }
}
export const findDoctorByUsername = async(username)=>{
    try{
        return await DoctorModel.findOne({username});
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
        
}
