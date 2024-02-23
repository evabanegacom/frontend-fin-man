import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import AuthService from '../services/auth-service';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const userData = useSelector((state: any) => state?.reducer?.auth);
    const navigate = useNavigate();
    console.log(userData);
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        localStorage.clear();
        try {
            const response = await AuthService.login(user);
            localStorage.setItem('user', JSON.stringify(response.jwt_token));
            // Handle success, redirect, or perform additional actions
        } catch (error) {
            // Handle error
            console.error('Error logging in:', error);
        }
    };

    const forgotPassword = () => navigate('/forgot-password');
  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>
            Email:
            <input type="email" name="email" style={{color: 'black' }} onChange={handleChange} />
            </label>
            <label>
            Password:
            <input type="password" name="password" style={{color: 'black' }}  onChange={handleChange} />
            </label>
            <button style={{ color: "#fff"}} type="submit">Login</button>
        </form>
        <div>Forgot password</div>
        <button style={{ color: "#fff"}} type='button' onClick={forgotPassword}>forgot password</button>
    </div>
  )
}

export default Login