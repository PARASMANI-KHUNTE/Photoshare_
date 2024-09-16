import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for forgot password navigation
import {  toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye  , faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import AuthNav from './AuthNav';


const Login = () => {
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const [formData, setFormData] = useState({ Username: '', Password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(`${baseUrl}auth/login`, formData , {
        withCredentials: true  // Ensure cookies are sent
    });

      if (response.data.success) {
        const { token ,username} = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        toast.success("Login Successfull");
        navigate('/home');
      } else {
        toast.error("Login Failed");
        setErrorMessage(response.data.error || 'Invalid login credentials.');
        
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div >
      <AuthNav/>

    <div className='min-h-screen bg-gray-100 flex  items-center justify-center'>
    <form onSubmit={handleLoginSubmit} className="bg-white shadow-md rounded-lg px-8 py-6">
        <div className="mb-4">
          <label htmlFor="Username" className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            name="Username"
            onChange={handleChange}
            value={formData.Username}
            id="Username"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4 flex justify-between space-x-4">
          <button onClick={togglePasswordVisibility} className="togglePassword bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Login
          </button>
        </div>
        <div className="mt-4">
          <Link to="/resetPassword" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
     
    </div>
  );
};

export default Login;
