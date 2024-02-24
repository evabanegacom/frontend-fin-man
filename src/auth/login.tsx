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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" onChange={handleChange} placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input autoComplete='off' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" onChange={handleChange} placeholder="Password" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/forgot-password">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <div className="text-center flex justify-between">
                    <p className="text-gray-700 ml-2">
                        Don't have an account?
                    </p>
                    <a href="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-2">
                        Sign up
                    </a>
                </div>

            </div>
        </div>

    )
}

export default Login