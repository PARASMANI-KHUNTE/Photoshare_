import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';  // Changed to useNavigate for React Router v6
import AuthNav from './AuthNav';
import {  toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye  , faEyeSlash} from '@fortawesome/free-solid-svg-icons';
const Signup = () => {
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const navigate = useNavigate();  // Changed to useNavigate
  const [formData, setFormData] = useState({ Fullname: '', Email: '', Username: '', Password: '' });
  const [error, setError] = useState(null);  // Optional: to handle any error message from the server
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData);
    // Send data to backend API
    try {
      const response = await axios.post(`${baseUrl}auth/signup`, formData);

      // Handle successful signup
      if (response.data.success) { // Assuming your backend returns a success flag
        console.log('Signup successful!');

        // Redirect to VerifyOtp page and pass email as state
        const email = formData.Email; // Extract email from the form data
        toast.success("SignUp Successfull");
        navigate('/verifyOtp', { state: { email, context: 'signup' } });
  // useNavigate instead of history.push
      } else {
        setError(response.data.error);
        toast.error("SignUp Failed");  // Handle server error (e.g., user already exists)
      }
    } catch (error) {
      console.error('Error sending signup data:', error);  // Handle network or other errors
      setError('An error occurred. Please try again later.');  // Set an error message
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div >
      <AuthNav/>
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6">
        <div className="mb-4">
          <label htmlFor="Fullname" className="block text-gray-700 font-bold mb-2">Fullname</label>
          <input
            type="text"
            name="Fullname"
            onChange={handleChange}
            value={formData.Fullname}
            id="Fullname"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="Email"
            onChange={handleChange}
            value={formData.Email}
            id="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
            name="Password"
            onChange={handleChange}
            value={formData.Password}
            id="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>} {/* Optional: Display error message */}
        <div className='space-x-4'>
        <button onClick={togglePasswordVisibility} className="togglePassword bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        
          Signup
        </button>
        </div>
      </form>
      </div>
      
    </div>
  );
}

export default Signup;
