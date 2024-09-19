import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationCard from './NotificationCard';
import {  toast } from 'react-toastify';
const Notification = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const [notifications, setNotifications] = useState([]);
  const showLoadingToast = () => {
    const loadingToast = toast.loading('Loading...');
    // Simulate an async operation
    setTimeout(() => {
      toast.dismiss(loadingToast); // Dismiss loading toast
      toast.success('Data loaded successfully!'); // Show success message
    }, 5000);
  };
 

  // Polling: Fetch notifications every 10 seconds
  useEffect(() => {
     // Fetch notifications for the logged-in user
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${baseUrl}UploadPost/getNotifications/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "username" : `${username}`
        },
        withCredentials: true,
      });
      setNotifications(response.data); // Assume data is an array of notifications
      showLoadingToast()
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 10000); // Fetch notifications every 10 seconds
    return () => clearInterval(intervalId);
  }, [token , username]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <hr className='mb-4'/>
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <NotificationCard
              key={notif._id}
              postTitle={notif.postTitle}
              username={notif.username}
              postMediaUrl={notif.postMediaUrl}
              createdAt={notif.createdAt}
              type={notif.type} // 'like' or 'comment'
              likedBy = {notif.likedBy}
            />
          ))
        ) : (
          <p>No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
