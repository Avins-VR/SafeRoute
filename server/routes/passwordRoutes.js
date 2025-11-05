const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found ❌" });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + parseInt(process.env.RESET_TOKEN_EXPIRY, 10);
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link expires in 1 hour.</p>
      `,
    });

    res.json({ message: "Reset link sent ✅ Check email" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending email ❌" });
  }
});

// ✅ Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token ❌" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error resetting password ❌" });
  }
});

module.exports = router;
