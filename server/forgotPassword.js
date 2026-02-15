const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DB_FILE = path.join(__dirname, 'db.json');

// --- Helper: Get Transporter ---
const getTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 2525, // Port 2525 is often better on Render
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

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

// 1. Forgot Password - Send OTP
router.post('/forgot-password', async (req, res) => {
    console.log("[FORGOT_PASSWORD] Starting process for:", req.body.email);
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        let user;
        let isMongo = false;

        if (process.env.MONGODB_URI) {
            isMongo = true;
            const User = mongoose.model('User');
            user = await User.findOne({ email });
        } else {
            const db = readData();
            user = db.users.find(u => u.email === email);
        }

        if (!user) {
            console.log("[FORGOT_PASSWORD] User not found:", email);
            return res.status(404).json({ message: 'No account found with this email. Please register first.' });
        }

        // Store OTP
        if (isMongo) {
            user.resetOtp = otp;
            user.resetOtpExpires = Date.now() + 10 * 60000;
            await user.save();
        } else {
            const db = readData();
            const localUser = db.users.find(u => u.email === email);
            localUser.resetOtp = otp;
            localUser.resetOtpExpires = Date.now() + 10 * 60000;
            writeData(db);
        }

        // Send Email via Brevo
        const transporter = getTransporter();
        const mailOptions = {
            from: `"Gullak Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🔐 Password Reset OTP',
            html: `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes.</p>`
        };

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing EMAIL_USER or EMAIL_PASS in Render settings.");
        }

        console.log("[FORGOT_PASSWORD] Attempting to send email via Brevo port 2525...");
        await transporter.sendMail(mailOptions);
        console.log("[FORGOT_PASSWORD] Email sent successfully!");

        res.json({ message: 'Success! OTP sent.' });

    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ message: `Mail Error: ${err.message}` });
    }
});

// 2. Verify OTP & Reset
router.post('/verify-otp', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if (process.env.MONGODB_URI) {
            const User = mongoose.model('User');
            const user = await User.findOne({ email });
            if (!user || user.resetOtp !== otp || Date.now() > user.resetOtpExpires) {
                return res.status(400).json({ message: 'Invalid or expired OTP.' });
            }
            user.password = hashedPassword;
            user.resetOtp = null;
            user.resetOtpExpires = null;
            await user.save();
        } else {
            const db = readData();
            const user = db.users.find(u => u.email === email);
            if (!user || user.resetOtp !== otp || Date.now() > user.resetOtpExpires) {
                return res.status(400).json({ message: 'Invalid or expired OTP.' });
            }
            user.password = hashedPassword;
            delete user.resetOtp;
            delete user.resetOtpExpires;
            writeData(db);
        }
        res.json({ message: 'Password updated successfully!' });
    } catch (err) {
        res.status(500).json({ message: `Reset failed: ${err.message}` });
    }
});

module.exports = router;
