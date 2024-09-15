import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Posts = () => {
    const baseUrl = "https://photoshare-backend.onrender.com/"
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null); // Track the post being edited
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDesc, setEditedDesc] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}UploadPost/postByUser`,
                    {
                        params: { username }, // Send username as a query parameter
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        withCredentials: true
                    }
                );
                setPosts(response.data.posts);
            } catch (error) {
                setErrorMessage('Failed to fetch posts.');
                console.error('Error fetching posts:', error);
            }
        };

        if (username) {
            fetchPosts();
        }
    }, [username,token]);

    const handleDelete = async (postId , ImageUrl) => {
        try {
            await axios.delete(
                `${baseUrl}UploadPost/posts/${postId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "username" : `${username}`,
                        "ImageUrl" : `${ImageUrl}`
                    },
                    withCredentials: true
                }
            );
            setPosts(posts.filter(post => post._id !== postId));
            toast.success('Post deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete post.');
            console.error('Error deleting post:', error);
        }
    };

    const handleEditClick = (post) => {
        setEditingPostId(post._id);
        setEditedTitle(post.PostTitle);
        setEditedDesc(post.PostDesc);
    };

    const handleUpdate = async (postId) => {
        try {
            
            await axios.put(
                `${baseUrl}UploadPost/posts/${postId}`,
                { PostTitle: editedTitle, PostDesc: editedDesc },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "username" : `${username}`
                    },
                    withCredentials: true
                }
            );
            setPosts(posts.map(post => post._id === postId ? { ...post, PostTitle: editedTitle, PostDesc: editedDesc } : post));
            setEditingPostId(null);
            toast.success('Post updated successfully!');
        } catch (error) {
            toast.error('Failed to update post.');
            console.error('Error updating post:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditedTitle('');
        setEditedDesc('');
    };

    return (
        <div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {posts.slice().reverse().map(post => (
                    <div key={post._id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col">
                        {editingPostId === post._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="text-xl font-bold mb-2 p-2 border rounded"
                                />
                                <textarea
                                    value={editedDesc}
                                    onChange={(e) => setEditedDesc(e.target.value)}
                                    className="text-gray-700 mb-4 flex-grow p-2 border rounded"
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleUpdate(post._id)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold mb-2">{post.PostTitle}</h2>
                                <p className="text-gray-700 mb-4 flex-grow">{post.PostDesc}</p>
                                {post.ImageUrl && (
                                    <img
                                        src={post.ImageUrl}
                                        alt="Post"
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                )}
                                <div className="flex items-center space-x-2 mb-4">
                                    <p className="text-gray-600">{post.PostLikes} Likes</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(post)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id, post.ImageUrl)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                    
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
