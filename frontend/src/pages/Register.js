// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // นำเข้าไฟล์ CSS
import coffeeBg from '../assets/coffee-table.png'; // นำเข้ารูปพื้นหลัง
import logoText from '../assets/dop-dop-coffee.png'; // นำเข้ารูปโลโก้

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://backend:5000/register', { email, username, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <h2>Sign up!</h2>
                <p>Please enter your information</p>
                <form onSubmit={handleSubmit}>
                    <label>E-mail</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <div className="terms">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I've read and agree with terms of service and our privacy policy</label>
                    </div>

                    <button type="submit" className="register-button">Sign up</button>
                    <p>Already have an account? <a href="/login">Sign in</a></p>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
            <div className="register-right" style={{ backgroundImage: `url(${coffeeBg})` }}>
                <img src={logoText} alt="Dop dop Coffee" className="logo-text" />
            </div>
        </div>
    );
}

export default Register;
