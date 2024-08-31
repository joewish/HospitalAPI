import mongoose from "mongoose";  // Import the mongoose library
// Report schema
export const reportSchema = new mongoose.Schema({
    doctorId: { 
      type: mongoose.Schema.Types.ObjectId,  
      ref: 'Doctor',                        
      required: true                         
    },
    patientId: { 
      type: mongoose.Schema.Types.ObjectId,   
      ref: 'Patient',                         
      required: true                          
    },
    status: { 
      type: String,                           
      enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'], 
      required: true                            
    },
    date: { 
      type: Date,                                                
      default: Date.now    
    }
  });
  