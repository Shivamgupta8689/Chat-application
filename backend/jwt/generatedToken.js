import jwt from "jsonwebtoken";

export const createTokenSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "5d",
    });

    const cookieOptions = {
        httpOnly: true,
        path: "/",
        maxAge: 5 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
    };

    res.cookie("jwt", token, cookieOptions);

    return token;
};
