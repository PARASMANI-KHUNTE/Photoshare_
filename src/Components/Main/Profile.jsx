import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import PostByUser from './PostByUser'
const Profile = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // Fetch user details from API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!username) {
          setError('Username not found in localStorage or cookies');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}UploadPost/profile/${username}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              "username" : `${username}`  // Add Authorization header
            },
            withCredentials: true,  // Ensure cookies are sent with the request
          });

        setUserDetails(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [token,username]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle avatar upload
  const handleAvatarUpload = async () => {
    const username = localStorage.getItem('username');
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      
      

      const response = await axios.post(
        `${baseUrl}UploadPost/profile/avatar/${username}`,formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            "username" : `${username}`  // Add Authorization header
          },
          withCredentials: true,  // Ensure cookies are sent with the request
        }
      );

      toast.success('Avatar updated successfully!');
      setUserDetails({ ...userDetails, AvatarUrl: response.data.avatarUrl }); // Update UI with new avatar
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to update avatar. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }

  return (
    <div >
       <Navbar/>
      <div className=" bg-gray-100 flex flex-col items-center justify-center">
      <div className="min-h-screen bg-white p-8 rounded-lg shadow-lg w-full ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Edit Avatar</label>
            <input type="file" onChange={handleFileChange} className="block mb-2" />
            <button
              onClick={handleAvatarUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Upload Avatar
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <img
            src={userDetails.AvatarUrl || 'https://via.placeholder.com/150'} // Placeholder if no avatar
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{userDetails.FullName || userDetails.Username}</h2>
            <p className="text-gray-600 mb-1"><strong>Email:</strong> {userDetails.Email}</p>
            {/* <p className="text-gray-600 mb-1"><strong>Followers:</strong> {userDetails.FollowerCount}</p>
            <p className="text-gray-600"><strong>Following:</strong> {userDetails.FollowingCount}</p> */}
          </div>
        </div><PostByUser/>
      </div>
      </div>
              


          
      
    </div>
  );
};

export default Profile;