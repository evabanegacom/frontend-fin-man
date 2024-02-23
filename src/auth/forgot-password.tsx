import { useState } from 'react'
import AuthService from '../services/auth-service';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [ email, setEmail ] = useState('')
  const navigate = useNavigate()
  const handleChange = (e: any) => {
    setEmail(e.target.value)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await AuthService.forgotPassword({ email })
      if (response) {
        // Handle success, redirect, or perform additional actions
        console.log(response)
        navigate('/reset-password')
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
      console.error('Error logging in:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>
          Email:
          <input type="email" name="email" style={{color: 'black' }} onChange={handleChange} />
        </label>
        <button style={{ color: "#fff"}} type="submit">Submit</button>
      </form>
      <div>Forgot password</div>
      <button style={{ color: "#fff"}} type='button' onClick={() => navigate('login')}>Login</button>
    </div>
  )
}

export default ForgotPassword