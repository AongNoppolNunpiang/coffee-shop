// controllers/UserController.js
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // ตรวจสอบว่าอีเมลมีอยู่ในระบบหรือไม่
        const results = await UserModel.findUserByEmail(email);

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // เข้ารหัส password
        const hashedPassword = await bcrypt.hash(password, 10);

        // บันทึกข้อมูลผู้ใช้ใหม่
        await UserModel.addUser(email, username, hashedPassword);
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ error: 'Database error or hashing error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await UserModel.findUserByEmail(email);

        if (results.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = results[0];

        // ตรวจสอบว่า password ถูกต้องหรือไม่
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });

    } catch (err) {
        res.status(500).json({ error: 'Database error or bcrypt error' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
