const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// --- Email Transporter Setup (Gmail/Nodemailer) ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Helper: Read DB
const readData = () => {
    try {
        if (!fs.existsSync(DB_FILE)) return { users: [] };
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch (err) {
        return { users: [] };
    }
};

// Helper: Write DB
const writeData = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// 1. Forgot Password - Send OTP via EMAIL
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;


    const db = readData();

    // Find user in the database
    const user = db.users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: 'User not found with this email' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in DB with expiry (10 minutes)
    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60000;
    writeData(db);

    // Send the actual email
    const mailOptions = {
        from: `"Gullak Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🔐 Your Gullak Password Reset OTP',
        text: `Hello, your OTP for resetting your Gullak password is: ${otp}. This code is valid for 10 minutes. If you didn't request this, please ignore this email.`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #FFD700;">Gullak Password Reset</h2>
                <p>Hello,</p>
                <p>You requested to reset your password. Use the following OTP to proceed:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #FFD700; margin: 20px 0;">
                    ${otp}
                </div>
                <p>This code is valid for <b>10 minutes</b>.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email.</p>
            </div>
        `
    };

    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing EMAIL_USER or EMAIL_PASS in .env");
        }
        await transporter.sendMail(mailOptions);
        res.json({ message: 'OTP sent to your email successfully.' });
    } catch (err) {
        console.error("Nodemailer Error:", err);
        res.status(500).json({
            message: 'Failed to send email. Please check your server .env configuration.',
            error: err.message
        });
    }
});

// 2. Verify OTP & Reset Password
router.post('/verify-otp', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const db = readData();
    const user = db.users.find(u => u.email === email);

    // Validate OTP and Expiry
    if (!user || user.resetOtp !== otp || Date.now() > user.resetOtpExpires) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Cleanup OTP fields
    delete user.resetOtp;
    delete user.resetOtpExpires;

    writeData(db);
    res.json({ message: 'Password reset successful! You can now login with your new password.' });
});

module.exports = router;
