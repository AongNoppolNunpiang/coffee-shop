const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); // เพิ่มบรรทัดนี้เพื่อ import UserController

router.post('/login', UserController.loginUser);  // เรียกใช้งาน loginUser ที่ถูก export จาก UserController
router.post('/register', UserController.registerUser);  // เรียกใช้งาน registerUser ที่ถูก export จาก UserController

module.exports = router;
