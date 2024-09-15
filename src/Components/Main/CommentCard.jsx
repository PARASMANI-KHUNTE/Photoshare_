import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const CommentCard = ({ postId }) => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  useEffect(() => {
    // Fetch user ID from the /user/me route
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${baseUrl}UploadPost/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "username" : `${username}`
          },
          withCredentials: true,
        });
        setCurrentUserId(response.data.user._id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, [token , username]);

  useEffect(() => {
    // Fetch comments for the post
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseUrl}UploadPost/comments/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "username" : `${username}`
          },
          withCredentials: true,
        });
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId , username , token]);

  const handleAddComment = async () => {


    if (newComment.trim() === '') return; // Prevent empty comments

    try {
      await axios.post(
        `${baseUrl}UploadPost/comments/${postId}`,
        { comment: newComment, commentBy: username }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "username" : `${username}`
          },
          withCredentials: true,
        }
      );
      setNewComment(''); // Clear input after comment submission
      const updatedComments = await axios.get(`${baseUrl}UploadPost/comments/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "username" : `${username}`
        },
        withCredentials: true,
      });
      setComments(updatedComments.data.comments); // Refresh comments after adding
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {

    try {
      await axios.delete(`${baseUrl}UploadPost/comments/${postId}/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "username" : `${username}`
        },
        withCredentials: true,
      });

      // Refresh comments after deletion
      const updatedComments = await axios.get(`${baseUrl}UploadPost/comments/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "username" : `${username}`
        },
        withCredentials: true,
      });
      setComments(updatedComments.data.comments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="border-b border-gray-200 py-2 flex justify-between items-center">
            <div>
              <img src={comment.commentBy.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full inline mr-2" />
              <span className="font-semibold">{comment.commentBy.username}</span>: {comment.comment}
            </div>
            {/* Delete button visible only to the comment's author */}
            {currentUserId === comment.commentBy._id && (
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      {/* Comment Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="border border-gray-300 rounded-l-lg w-full px-4 py-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
          Comment
        </button>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentCard;
