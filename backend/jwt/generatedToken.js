import jwt from "jsonwebtoken";

export const createTokenSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "5d",
    });

    // Detect production environment - check multiple indicators
    const isProduction = process.env.NODE_ENV === 'production' || 
                        process.env.RENDER === 'true' || 
                        process.env.VERCEL === '1';
    
    // For cross-origin requests (Vercel frontend + Render backend)
    // sameSite: "None" REQUIRES secure: true
    const cookieOptions = {
        httpOnly: true,
        path: "/",
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    };

    if (isProduction) {
        // Production: Cross-origin requires SameSite=None and Secure=true
        cookieOptions.secure = true;
        cookieOptions.sameSite = "None";
    } else {
        // Development: Can use Lax for same-origin
        cookieOptions.secure = false;
        cookieOptions.sameSite = "Lax";
    }

    res.cookie("jwt", token, cookieOptions);

    return token;
};
