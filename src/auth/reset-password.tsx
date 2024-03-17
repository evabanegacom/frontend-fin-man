import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../services/auth-service';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const ResetPassword = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const [ newPassword, setNewPassword ] = useState({
      newPassword: '',
      confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
              new_password: newPassword?.newPassword,
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
    <div style={{height: '89.3vh' }} className="">
    <ToastContainer />
        <p>Reset your password</p>
        <form onSubmit={handleSubmit} className="flex flex-col">

            <div className="relative">
            <label htmlFor="password" className="block text-sm text-gray-700 font-bold">New Password:</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input type={showPassword ? 'text' : 'password'} name="newPassword" className="focus:ring-0 focus:outline-none block w-full pr-10 sm:text-sm border-b border-gray-300 p-2 border-gray-300 rounded-md" onChange={handleChange} />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
                {showPassword ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>


          <div className="relative">
            <label htmlFor="password" className="block text-sm text-gray-700 font-bold">Confirm Password:</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input type={showPassword ? 'text' : 'password'} name="confirmPassword" className="focus:ring-0 focus:outline-none block w-full pr-10 sm:text-sm border-b border-gray-300 p-2 border-gray-300 rounded-md" onChange={handleChange} />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
                {showPassword ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

            <button style={{ color: "#fff"}} type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ResetPassword