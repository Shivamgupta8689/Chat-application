import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const secureRoute = async (req,res,next)=>{
    try {
        if (!process.env.JWT_TOKEN) {
            console.error("JWT_TOKEN environment variable is not defined");
            return res.status(500).json({message: "Server configuration error"})
        }

        const token = req.cookies.jwt;
        if(!token){
            // Log for debugging (in production, you might want to remove this)
            if (process.env.NODE_ENV === 'development') {
                console.log("No JWT cookie found. Cookies received:", Object.keys(req.cookies));
                console.log("Request origin:", req.headers.origin);
            }
            return res.status(401).json({message: "Not authorized - No token provided"})
        }
        
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if(!verified || !verified.userId){
            return res.status(403).json({message: "Invalid or expired token"})
        }
        
        const user = await User.findById(verified.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({message: "Invalid token"})
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({message: "Token expired"})
        }
        console.error("Secure route error:", error);
        return res.status(500).json({message: "Internal server error"})
    }
}

export default secureRoute;