// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // นำเข้าไฟล์ CSS
import coffeeBg from '../assets/coffeeBg.png';
import logo from '../assets/logo.png'; // นำเข้ารูปโลโก้

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://backend:5000/login', { email, password });
            setMessage(response.data.message);  // แสดงข้อความจาก server เช่น 'Login successful'
        } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left" style={{ backgroundImage: `url(${coffeeBg})` }}>
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="brand-name">Dop dop Coffee</h1>
                <p className="slogan">dopdop yesyes</p>
            </div>
            <div className="login-right">
                <h2>Welcome!</h2>
                <p>Please enter your information</p>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className="login-button">Sign in</button>

                    <div className="login-options">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                        <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    </div>
                    <p>Don’t have an account? <a href="/register">Sign up now</a></p>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default Login;
