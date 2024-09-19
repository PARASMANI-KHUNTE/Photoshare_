import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const baseUrl = "https://photoshare-backend.onrender.com"
    const showLoadingToast = () => {
        const loadingToast = toast.loading('Loading...');
        // Simulate an async operation
        setTimeout(() => {
          toast.dismiss(loadingToast); // Dismiss loading toast
          toast.success('Data loaded successfully!'); // Show success message
        }, 5000);
      };
    const handleSendOtp = async () => {
        if (!email) {
            toast.error('Please enter your email.');
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post(`${baseUrl}/sendOtp`, { email });
            showLoadingToast()
            if (response.data.success) {
                toast.success('OTP sent successfully!');
                navigate('/verifyOtp', { state: { email, context: 'emailVerify' } });
    
            } else {
                toast.error('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('An error occurred while sending OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={handleSendOtp}
                    className={`w-full p-2 text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} rounded`}
                    disabled={loading}
                >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
