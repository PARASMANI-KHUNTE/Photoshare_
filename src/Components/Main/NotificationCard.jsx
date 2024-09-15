import PropTypes from 'prop-types';
import moment from 'moment'; 

const NotificationCard = ({ postTitle, username, postMediaUrl, type,likedBy , createdAt }) => {
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center">
      <div className="w-16 h-16 mr-4">
        <img src={postMediaUrl} alt={postTitle} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div>
        <p><strong>{username}</strong></p>
        <p><strong>{likedBy}</strong></p>
        <p className="text-sm text-gray-700">
           {type === 'like' ? 'liked' : 'commented on'} your post: <strong>{postTitle}</strong>
        </p>
        <p>{moment(createdAt).format('MMMM Do, YYYY')}</p>
      </div>
    </div>
  );
};

NotificationCard.propTypes = {
  postTitle: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  postMediaUrl: PropTypes.string, // Optional if not every post has media
  type: PropTypes.string.isRequired,
  likedBy: PropTypes.string,
  createdAt: PropTypes.string,
};

export default NotificationCard;
