import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ActivateAccount = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();
  console.log({token})
  // <a href="https://fin-man.fly.dev/api/v1/activate/<%= user.activation_token %>">Activate Account</a>

  const activateAccount = async () => {
    const response:any = await axios.get(`https://fin-man.fly.dev/api/v1/activate/${token}`);
    if (response) {
      toast.success('Account activated successfully');
      navigate('/login');
    } else {
      toast.error('Failed to activate account');
    }
  }


  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 style={{ color: "#fff"}}>Activate Account</h1>
      <p style={{ color: "#fff"}}>Activation token: {token}</p>
      {/* You can perform activation logic here */}
    </div>
  );
};

export default ActivateAccount;
