import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../services/auth-service';

const ResetPassword = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const [ newPassword, setNewPassword ] = useState('');
    const navigate = useNavigate();
    const confirmAccount = async () => {
        const response:any = await axios.get(`https://fin-man.fly.dev/api/v1/password/reset/${token}`);
        if (response) {
          toast.success('Account activated successfully');
        } else {
          toast.error('Failed to activate account');
        }
      }
    
    
      useEffect(() => {
        confirmAccount();
      }, []);

      const handleChange = (e: any) => {
        setNewPassword(e.target.value)        
      }

        const handleSubmit = async (e: any) => {
            e.preventDefault()
            // write logic to make password password match

            const data = {
              new_password: newPassword,
              reset_token: token
            }

            try {
            const response = await AuthService.updatePassword(data)
            if (response) {
                toast.success('Password reset successfully')
                navigate('/login')
            } else {
                toast.error('Failed to reset password')
            }
            } catch (error) {
            console.error('Error resetting password:', error)
            }
        }

    
  return (
    <div style={{ color: '#fff'}}>
              <ToastContainer />
        <p>Reset your password</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>
            New Password:
            <input type="password" name="newPassword" style={{color: 'black' }} onChange={handleChange} />
            </label>
            <label>
            Confirm Password:
            <input type="password" name="confirmPassword" style={{color: 'black' }} onChange={handleChange} />
            </label>
            <button style={{ color: "#fff"}} type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ResetPassword