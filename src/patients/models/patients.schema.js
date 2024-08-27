import mongoose from "mongoose"; // Import the mongoose library
import moment from "moment-timezone"; // Import the moment-timezone library for handling time zones


// Define the Patient schema
const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,   // patient's name as a string
    required: true  // patient's name is required
  },
  phoneNumber: {
    type: String,
    required: true  // patient's phone number is required
  },
  createdAt: {
    type: Date,   // The creation date of the patient record
    default: () => moment.tz('Asia/Kolkata').toDate()  // Default value set to current date and time in 'Asia/Kolkata' time zone
  },
  report: [  // Array of report IDs referencing the Report model
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report'
    }
  ]
});

// Create and export the Patient model
const Patient = mongoose.model('Patient', patientSchema);

export default Patient;