import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
const ResetPassword = () => {
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const [email, setEmail] = useState('');
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
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}auth/sendOtp`, { email });
      showLoadingToast()
      if (response.data.success) {
        toast.success(`OTP Sent Successfully  to ${email}` )
        navigate('/verifyOtp', { state: { email, context: 'resetPassword' } });
 // Redirect to verify OTP
      } else {
        toast.error(`Failed to  Sent OTP  to ${email}` )
        setErrorMessage(response.data.error || 'Error sending OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <form onSubmit={handleEmailSubmit} className="bg-white shadow-md rounded-lg px-8 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Reset Password</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
