import React, { useState } from 'react'
import AuthService from '../services/auth-service';

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null,
  })

    const handleChange = (e: any) => {
        const { name, value, files } = e.target;
        setUser((prevUser) => ({
        ...prevUser,
        [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
        formData.append(key, value as any);
        });
        try {
        await AuthService.createAccount(formData);
        // Handle success, redirect, or perform additional actions
        } catch (error) {
        // Handle error
        console.error('Error creating user:', error);
        }
    };
  return (
    <div style={{ color: '#fff'}}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>
            Name:
            <input type="text" name="name" style={{color: 'black' }} onChange={handleChange} />
            </label>
            <label>
            Email:
            <input type="email" name="email" style={{color: 'black' }} onChange={handleChange} />
            </label>
            <label>
            Password:
            <input type="password" name="password" style={{color: 'black' }}  onChange={handleChange} />
            </label>
            <label>
            Confirm Password:
            <input type="password" name="password_confirmation" style={{color: 'black' }} onChange={handleChange} />
            </label>
            <label>
            Avatar:
            <input type="file" name="avatar" onChange={handleChange} />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp