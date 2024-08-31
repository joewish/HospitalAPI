// imports required for cookies creations
import dotenv from 'dotenv'; 
import path from 'path'
dotenv.config({ path: path.resolve("config","uat.env") });
export const sendToken = async (doctor, res, statusCode) => {
    const token = doctor.getJWTToken();
    const cookieOptions = {
      expires: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000 
      ),
      httpOnly: true,
    };
    res
      .status(statusCode)
      .cookie("token", token, cookieOptions)
      .json({ success: true, doctor, token });
  };
  