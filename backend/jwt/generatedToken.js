import jwt from "jsonwebtoken";

export const createTokenSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "5d",
    });

    // Production-ready cookie settings for cross-origin (Vercel + Render)
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction, // Only secure in production (HTTPS required)
        sameSite: isProduction ? "None" : "Lax", // None for cross-origin in production
        path: "/",
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        // Don't set domain - let browser handle it for cross-origin
    });

    return token;
};
