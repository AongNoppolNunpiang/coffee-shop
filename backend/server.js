const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs'); // ใช้ bcrypt สำหรับการเข้ารหัส password
require('dotenv').config();
const cors = require('cors');  // นำเข้า cors
const app = express();
const port = 5000;

app.use(express.json()); // เพื่อให้สามารถอ่านข้อมูลจาก request body

// ตั้งค่า CORS
const corsOptions = {
    origin: 'http://localhost:3000',  // อนุญาตให้เข้าถึงจาก http://localhost:3000
    methods: ['GET', 'POST'],  // อนุญาต HTTP methods นี้
    allowedHeaders: ['Content-Type', 'Authorization'],  // อนุญาต headers นี้
};
app.use(cors(corsOptions));  // ใช้ CORS ที่กำหนด

// ตั้งค่าการเชื่อมต่อกับ MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'coffee_shop'
});

// เชื่อมต่อกับฐานข้อมูล MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Register Route: สำหรับการลงทะเบียนผู้ใช้ใหม่
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // ตรวจสอบว่า email ซ้ำกับที่มีอยู่ในฐานข้อมูลหรือไม่
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // เข้ารหัส password ก่อนเก็บในฐานข้อมูล
        const hashedPassword = await bcrypt.hash(password, 10);

        // เพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Login Route: สำหรับการเข้าสู่ระบบ
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = results[0];

        // ตรวจสอบ password โดยใช้ bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        // ถ้าผ่านการตรวจสอบ password ให้ login ได้
        res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    });
});

// สร้างเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
