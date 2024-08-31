import mongoose from "mongoose"; // Import the mongoose library
// Patient schema
export const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,  
    required: true
  },
  phoneNumber: {
    type: String,
    required: true  
  },
  createdAt: {
    type: Date,   
    default: Date.now 
  },
  report: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report'
    }
  ]
});
