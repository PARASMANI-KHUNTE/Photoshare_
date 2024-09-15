import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const Feeds = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const baseUrl = "https://photoshare-backend.onrender.com/"
  // State to store the posts data
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        const response = await axios.get(`${baseUrl}UploadPost/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "username" : `${username}`
          },
          withCredentials: true,
        }); // Update with your actual API URL
        // Assuming the response structure has the posts inside 'data' as an array
        setPosts(response.data.posts); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token,username]); // Empty dependency array to run the effect only once on component mount

  // Loading state
  if (loading) {
    return <div className="text-center p-10">Loading posts...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }

  return (
    <div className="feed bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
  {posts.slice().reverse().map((post) => (
    <PostCard
      key={post._id} // Assuming _id from MongoDB
      avtarUrl={post.PostByAvtarUrl || post.PostBy.AvatarUrl} // Adjusted to check both PostByAvtarUrl and AvatarUrl
      postTitle={post.PostTitle} // Post title field from the database
      postDesc={post.PostDesc} // Post description field
      postMediaUrl={post.ImageUrl} // Media URL for the post
      PostLikes={post.PostLikes || 0} // Number of likes (default to 0 if not provided)
      byUser={post.PostBy?.FullName || post.PostBy?.Username || 'Unknown User'} // Safely accessing user's name
      dateTime={post.PostTime} // Post time
      postId={post._id} // Pass post ID for like/unlike operations
      userId={post.PostBy._id} // Pass user ID for like/unlike operations
    />
  ))}
</div>

  );
};

export default Feeds;
