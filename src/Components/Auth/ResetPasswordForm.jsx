import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {  toast } from 'react-toastify';
const ResetPasswordForm = () => {
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const location = useLocation();
  const email = location.state?.email; // Ensure email is being passed correctly
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const showLoadingToast = () => {
    const loadingToast = toast.loading('Loading...');
    // Simulate an async operation
    setTimeout(() => {
      toast.dismiss(loadingToast); // Dismiss loading toast
      toast.success('Data loaded successfully!'); // Show success message
    }, 5000);
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    try {
      const response = await axios.put(`${baseUrl}auth/resetPassword`, {
        email,
        password,
      });
      showLoadingToast()
      if (response.data.success) {
        toast.success("Reset Password Successfull");
        navigate('/login'); // Redirect to login after successful password reset
      } else {
        toast.error(`Reset Password Failed ${response.data.message}`);
        setErrorMessage(response.data.message || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error resetting password:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <form onSubmit={handlePasswordSubmit} className="bg-white shadow-md rounded-lg px-8 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Reset Your Password</h1>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex justify-between items-center">
          <button type='button' onClick={togglePasswordVisibility} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
