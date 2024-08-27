// create token and save into cookie

export const sendToken = async (doctor, res, statusCode) => {
    // Generate a JWT token for the doctor
    const token = doctor.getJWTToken();

    // Define options for the cookie
    const cookieOptions = {
      // Set the cookie expiration date
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000  // Calculate expiration based on environment variable
      ),
      httpOnly: true,  // Cookie is only accessible through HTTP requests, not JavaScript
    };

    // Send response with status code, set the cookie, and include token and doctor information in the JSON response
    res
      .status(statusCode)
      .cookie("token", token, cookieOptions)
      .json({ success: true, doctor, token });
  };
  