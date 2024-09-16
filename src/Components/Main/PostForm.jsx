import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUpload , faCloudUploadAlt  } from '@fortawesome/free-solid-svg-icons';
// import Cookies from 'js-cookie'; // Import js-cookie for cookie handling
import Navbar from './Navbar';
const PostForm = () => {
  const username = localStorage.getItem('username');
  const TokenFromLocal = localStorage.getItem('token')
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('postTitle', postTitle);
    formData.append('postDesc', postDesc);
    formData.append('file', file);
  
    try {
      await axios.post(
        `${baseUrl}UploadPost/UploadPost`,  // Remove the extra quotes
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${TokenFromLocal}`,
            "username" : `${username}`  // Use Authorization header for token
          },
          withCredentials: true,  // Ensure cookies are sent with the request
        }
      );
  
      toast.success('Post uploaded successfully!');
      setSuccessMessage('Post uploaded successfully!');
      setErrorMessage('');
  
      // Reset form data
      setPostTitle('');
      setPostDesc('');
      setFile(null);
  
      navigate('/home');
    } catch (error) {
      toast.error('Failed to upload post.');
      setErrorMessage('Failed to upload post.');
      setSuccessMessage('');
      console.error('Error uploading post:', error);
    }
  };
  
  

  return (
    <div >
      <Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center"> 
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="postTitle" className="block text-gray-700 font-semibold">Post Title</label>
            <input
              type="text"
              id="postTitle"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>
          <div>
            <label htmlFor="postDesc" className="block text-gray-700 font-semibold">Post Description</label>
            <textarea
              id="postDesc"
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post description"
              required
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-gray-700 font-semibold"> <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Image</label>
            <input
            style={{ display: 'none' }} 
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          <FontAwesomeIcon icon={faUpload} />
          </button>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default PostForm;
