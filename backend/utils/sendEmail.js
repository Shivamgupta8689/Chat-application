import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 25px; border-radius: 10px; border: 1px solid #eee;">
          
          <h2 style="text-align: center; color: #4A90E2;">🔐 Verify Your Email</h2>
          
          <p style="font-size: 15px; color: #333;">
            Dear user,<br><br>
            Use the OTP below to verify your email and proceed with resetting your password.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <div style="
              display: inline-block;
              padding: 15px 25px;
              background: #4A90E2;
              color: white;
              font-size: 28px;
              font-weight: bold;
              letter-spacing: 5px;
              border-radius: 8px;
            ">
              ${otp}
            </div>
          </div>

          <p style="font-size: 14px; color: #555;">
            This OTP is valid for <b>5 minutes</b>.  
            Please do not share it with anyone for security reasons.
          </p>

          <hr style="margin-top: 30px;">
          
          <p style="font-size: 12px; text-align: center; color: #777;">
            If you didn't request this email, you can safely ignore it.<br>
            © ${new Date().getFullYear()} Your App Name — All Rights Reserved.
          </p>
        </div>
      </div>
    `;



    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Your OTP Code - Secure Verification",
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP Sent Successfully!");
  } catch (error) {
    console.log("Email Error: ", error);
  }
};