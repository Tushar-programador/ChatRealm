import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {


    // Extract the token from cookies
    const token = req.cookies.auth; // Corrected spelling and added 'auth' key to extract the correct token


    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
   
    

    // Attach the decoded user info to the request object for use in other routes
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (e) {
    console.error("Token verification failed:", e.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: e.message });
  }
};
