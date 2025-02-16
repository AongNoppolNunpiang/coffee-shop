// models/UserModel.js
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// ฟังก์ชันหาผู้ใช้จากอีเมล
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                reject(err); // ส่งข้อผิดพลาด
            }
            resolve(results); // ส่งผลลัพธ์
        });
    });
};

// ฟังก์ชันเพิ่มผู้ใช้ใหม่
const addUser = (email, username, hashedPassword) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
            [email, username, hashedPassword],
            (err) => {
                if (err) {
                    reject(err); // ส่งข้อผิดพลาด
                }
                resolve(); // เสร็จสิ้นการเพิ่มข้อมูล
            }
        );
    });
};

module.exports = {
    findUserByEmail,
    addUser
};
