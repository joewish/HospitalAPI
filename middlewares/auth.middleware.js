import jwt from 'jsonwebtoken';

// function to handle authentication
export const auth = async (req, res, next) => {

    // Extract the token from the request cookies
    const { token } = req.cookies;

    // If no token is found, send a 500 status with an error message
    if (!token) {
      return res.status(500).json({ message: 'Sorry you are  not login' });
    }

    // Verify the token and attach the decoded user information to the request object
    req.user = jwt.verify(token, process.env.JWT_Secret);
    
    next();
  };
  