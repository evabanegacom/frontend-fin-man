import { useState, useRef, } from 'react'
import AuthService from '../services/auth-service';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const fileRef = useRef<any>(null);

  const toggleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const triggerOnChange = () => {
    fileRef.current.click();
  };

  const [user, setUser] = useState<any>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null,
  })

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setUser((prevUser:any) => ({
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
    <div className='bg-gray-100 py-10'>
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 py-12 px-4 sm:px-6 lg:px-8">
        <h5 className="font-bold text-center mb-8">Sign Up</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 font-bold">Name:</label>
            <input type="text" name="name" id="name" className="mt-1 p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-b border-gray-300 rounded-md" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 font-bold">Email:</label>
            <input type="email" name="email" id="email" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange} />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm text-gray-700 font-bold">Password:</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input type={showPassword ? 'text' : 'password'} name="password" id="password" className="focus:ring-0 focus:outline-none block w-full pr-10 sm:text-sm border-b border-gray-300 p-2 border-gray-300 rounded-md" onChange={handleChange} />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
                {showPassword ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password_confirmation" className="block text-sm text-gray-700 font-bold">Confirm Password:</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input type={showPasswordConfirmation ? 'text' : 'password'} name="password_confirmation" id="password_confirmation" className="focus:ring-0 focus:outline-none block border-b w-full pr-10 sm:text-sm border-gray-300 p-2 rounded-md" onChange={handleChange} />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={toggleShowPasswordConfirmation}>
                {showPasswordConfirmation ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Image(optional):</label>
            <input type="file" name="avatar" id="avatar" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange} />
          </div> */}

<div className="relative">
  <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Optional:</label>
  <input ref={fileRef} type="file" name="avatar" id="avatar" className="hidden" onChange={handleChange} />
  <div className="mt-1 flex items-center whitespace-nowrap">
    <span onClick={triggerOnChange} className="mr-2 inline-block py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 cursor-pointer font-bold">
      Choose Image
    </span>
    {user.avatar ? <span className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-no-wrap">{user.avatar.name}</span> : <span className="text-gray-500">No file chosen</span>}
  </div>
</div>


          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp