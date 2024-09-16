import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse ,faPlus ,faBell,faUser,faPersonThroughWindow} from '@fortawesome/free-solid-svg-icons'; 
const Navbar = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const baseUrl = "https://photoshare-backend.onrender.com/"
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseUrl}auth/logout`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`, // Attach the token in the header
            "username" : `${username}`
        },
        withCredentials: true, // If you want to include cookies with the request
    });
      if (response.status === 200) {
        console.log('Logged out successfully');
        localStorage.removeItem('token'); // Clear token from local storage
        localStorage.removeItem('username'); // Clear token from local storage
        toast.success('Logged out successfully');
        navigate('/'); // Redirect to the home page
      } else {
        console.error('Logout failed:', response.data);
        toast.error('Failed to Logout.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
   <div className='bg-white shadow-md p-4 md:p-5'>
  <div className='flex flex-col md:flex-row justify-between items-center'>
    <Link className='text-lg font-bold mb-4 md:mb-0' to="/home">PHOTOSHARE</Link>
    <ul className='flex flex-wrap space-x-4 md:space-x-5 items-center'>
      <li>
        <Link className='hover:text-white hover:bg-blue-500 rounded-full p-3 shadow-md transition-colors duration-300' to="/home">
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </Link>
      </li>
      <li>
        <Link className='hover:text-white hover:bg-blue-500 rounded-full p-3 shadow-md transition-colors duration-300' to="/post">
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </Link>
      </li>
      {/* Uncomment this if you want to include the chat icon */}
      {/* <li>
        <Link className='hover:text-white hover:bg-blue-500 rounded-full p-3 shadow-md transition-colors duration-300' to="/chat">
          <FontAwesomeIcon icon={faComment} size="lg" />
        </Link>
      </li> */}
      <li>
        <Link className='hover:text-white hover:bg-blue-500 rounded-full p-3 shadow-md transition-colors duration-300' to="/notification">
          <FontAwesomeIcon icon={faBell} size="lg" />
        </Link>
      </li>
      <li>
        <Link className='hover:text-white hover:bg-blue-500 rounded-full p-3 shadow-md transition-colors duration-300' to="/profile">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Link>
      </li>
     
      <li>
        <button className='hover:text-white mb-3  hover:bg-red-500 rounded-full p-3 shadow-md transition-colors duration-300' onClick={handleLogout}>
          <FontAwesomeIcon icon={faPersonThroughWindow} size="lg" />
        </button>
      </li> {/* Uncomment this if you want to include the settings icon */}
      {/* <li>
        <Link className='hover:text-white hover:bg-blue-500 rounded-full p-3 shadow-md transition-colors duration-300' to="/settings">
          <FontAwesomeIcon icon={faGear} size="lg" />
        </Link>
      </li> */}
    </ul>
  </div>
</div>

  )
}

export default Navbar
