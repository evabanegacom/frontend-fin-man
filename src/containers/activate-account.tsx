import React from 'react';
import { useParams } from 'react-router-dom';

const ActivateAccount = () => {
  const { token } = useParams();

  // Now you can use the token variable to perform activation logic

  return (
    <div>
      <h1>Activate Account</h1>
      <p>Activation token: {token}</p>
      {/* You can perform activation logic here */}
    </div>
  );
};

export default ActivateAccount;
