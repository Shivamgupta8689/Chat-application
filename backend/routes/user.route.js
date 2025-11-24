import express from "express"
import { userSignup, userLogin, userLogout, getUserProfile, forgotPassword, verifyOtp, resetPassword } from "../controllers/user.controller.js";
import upload from "../middelwares/multer.js";
import secureRoute from "../middelwares/secureRoute.js";
const router = express.Router()

router.post("/signup", upload.single("image"), userSignup);
router.post("/login",userLogin);
router.post("/logout",userLogout);
router.get("/getUserProfile", secureRoute, getUserProfile)
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router