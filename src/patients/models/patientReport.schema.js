import mongoose from "mongoose";  // Import the mongoose library
import moment from "moment-timezone"; // Import the moment-timezone library for handling time zones

// Define the Report schema
const reportSchema = new mongoose.Schema({
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
      type: String,                            // Status of the report
      enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],   // Allowed status values
      required: true                            // status is required
    },
    date: { 
      type: Date,                                                 // Date of the report
      default: () => moment.tz('Asia/Kolkata').toDate()           // Default value set to current date and time in 'Asia/Kolkata' time zone
    }
  });
  

  // Create and export the Report model
  const Report = mongoose.model('Report', reportSchema);
  export default Report;