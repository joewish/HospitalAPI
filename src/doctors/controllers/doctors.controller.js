// imports
import {findDoctorByUsername,registerDoctor} from "../models/doctor.repository.js";
import { sendToken } from "../../utils/sendToken.js";
export const register = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Check if a doctor with the given username already exists
    const existingDoctor = await findDoctorByUsername(username);
    if (existingDoctor) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const doctor = await registerDoctor(req.body);
    res.status(201).json({ message: "Doctor registerd successfully", doctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login method for doctor authentication
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const doctor = await findDoctorByUsername(username);
    if (!doctor) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const passwordMatch = await doctor.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Send a token if authentication is successful
    await sendToken(doctor, res, 200);
  } catch (error) {
    console.log("error", error); // Log the error for debugging purposes
    res.status(500).json({ message: "Internal server error" });
  }
};

// logout method for doctor logout
export const logout = async (req, res, next) => {
  // Clear the token cookie and send a success response
  res.status(200).cookie("token", null, {expires: new Date(Date.now()),httpOnly: true,}).json({ success: true, msg: "logout successful" });
};
