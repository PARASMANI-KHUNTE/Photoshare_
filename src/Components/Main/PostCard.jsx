import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CommentCard from './CommentCard'; // Assuming CommentCard component will be in the same folder

const PostCard = ({ avtarUrl, postTitle, postDesc, postId, postMediaUrl, byUser, dateTime, PostLikes }) => {
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const [likes, setLikes] = useState(PostLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false); // Toggle comments section
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const [isReadMore, setIsReadMore] = useState(true);

  useEffect(() => {
    // Check if the user has already liked the post
    const checkLikeStatus = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}UploadPost/likeStatus/${postId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              "username" : `${username}`
            },
            withCredentials: true,
          }
        );
        
        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    if (username) {
      checkLikeStatus();
    }
  }, [postId,username,token]);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}UploadPost/like`,
        { postId ,username},{
          headers: {
            'Authorization': `Bearer ${token}`,
            "username" : `${username}`
          },
          withCredentials: true,
        }
      );
      setLikes(response.data.PostLikes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments); // Toggle comments section
  };
  // Function to toggle between showing more or less text
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      
       
      <h2 className="text-2xl font-semibold mb-2">{postTitle}</h2>
      <p>{isReadMore ? postDesc.slice(0, 100) + '...' : postDesc}</p>
      <button onClick={toggleReadMore}>
        {isReadMore ? 'Read More' : 'Read Less'}
      </button>
      {postMediaUrl && (
        <div className="mt-2" onDoubleClick={handleLikeClick}>
          <img src={postMediaUrl} alt="Post" className="w-full h-96 object-cover rounded-lg" />
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <img src={avtarUrl} alt={`${byUser}'s avatar`} className="w-10 h-10 rounded-full mr-2" />
          <div>
            <h3 className="text-gray-800 font-bold">{byUser}</h3>
            <p className="text-gray-500 text-sm">{moment(dateTime).format('MMMM Do, YYYY')}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-1 ${isLiked ? 'bg-red-600' : 'bg-blue-500'} text-white px-2 py-1 rounded-md`}
          >
            <FontAwesomeIcon icon={faHeart} size="lg" />
            <span>{likes}</span>
          </button>
          {/* Comment Button */}
          <button
            onClick={toggleComments}
            className="flex items-center space-x-1 bg-gray-500 text-white px-2 py-1 rounded-md"
          >
            <FontAwesomeIcon icon={faComment} size="lg" />
          </button>
        </div>
      </div>
      {/* Show comments when the button is clicked */}
      {showComments && <CommentCard postId={postId} />}
    </div>
  );
};

PostCard.propTypes = {
  avtarUrl: PropTypes.string.isRequired,
  postTitle: PropTypes.string.isRequired,
  postDesc: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  postMediaUrl: PropTypes.string,
  byUser: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  PostLikes: PropTypes.number.isRequired,
};

export default PostCard;
