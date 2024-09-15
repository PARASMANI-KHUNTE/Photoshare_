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
    <div className=' bg-white shadow p-5'>
      
      <div className='flex justify-between items-center'> 
      <Link className=' p-2 text-bold' to="/home">PHOTOSHARE</Link>
        <ul className='space-x-5' >
          <Link className=' hover:text-white hover:bg-blue-500 rounded-full p-3 shadow' to="/home"><FontAwesomeIcon icon={faHouse} size="lg"/></Link>
          <Link className=' hover:text-white hover:bg-blue-500 rounded-full p-3 shadow' to="/post"><FontAwesomeIcon icon={faPlus} size="lg" /></Link>
          {/* <Link className=' hover:text-white hover:bg-blue-500 rounded-full p-3 shadow' to="/chat"><FontAwesomeIcon icon={faComment} size="lg" /></Link> */}
          <Link className=' hover:text-white hover:bg-blue-500 rounded-full p-3 shadow' to="/notification"><FontAwesomeIcon icon={faBell} size="lg" /></Link>
          <Link className=' hover:text-white hover:bg-blue-500 rounded-full p-3 shadow' to="/profile"><FontAwesomeIcon icon={faUser} size="lg" /></Link>
          {/* <Link className=' hover:text-white hover:bg-blue-500 rounded-full p-3 shadow' to="/settings"><FontAwesomeIcon icon={faGear}  size="lg" /></Link> */}
          <button className='hover:text-white hover:bg-red-500 rounded-full p-3 shadow' onClick={handleLogout}><FontAwesomeIcon icon={faPersonThroughWindow}  size="lg"/></button>
        </ul>
      </div>


    </div>
  )
}

export default Navbar