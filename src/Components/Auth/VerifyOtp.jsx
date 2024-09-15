import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios'; // Import axios for HTTP requests
import {  toast } from 'react-toastify';
const VerifyOtp = () => {
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const location = useLocation();
  const email = location.state?.email;
  const context = location.state?.context; // Retrieve context
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resendSuccess, setResendSuccess] = useState('');
  const navigate = useNavigate(); // Use useNavigate for redirection

  // Handle OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast("OTP must be 6 digits.");
      setErrorMessage('OTP must be 6 digits.');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}auth/verifyOtp`, {
        email,
        otp: parseInt(otp, 10), // Convert to number if necessary
      });

      if (response.data.success) {
        console.log('OTP Verified');
        toast.success("OTP Verified");
        if (context === 'signup') {
          navigate('/login'); // Redirect to login on successful sign-up verification
        } else if (context === 'resetPassword') {
          navigate('/resetPasswordForm',{ state: { email: email } }); // Redirect to reset password form
        }
      } else {
        toast.error("Invalid OTP")
        setErrorMessage(response.data.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await axios.post(`${baseUrl}auth/sendOtp`, {
        email,
      });

      if (response.data.success) {
        setResendSuccess('OTP has been resent successfully.');
        toast("OTP has been resent successfully.");
        setErrorMessage('');
      } else {
        toast("OTP has not been resent successfully.");
        setErrorMessage(response.data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Verify Email</h1>
        <p className="mb-6 text-gray-600">We have sent an OTP to your email: <span className="font-semibold">{email}</span></p>
        
        <form onSubmit={handleOtpVerify} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-gray-700 font-semibold">Enter OTP</label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit OTP"
            />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
            {resendSuccess && <p className="text-green-500">{resendSuccess}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
