
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom'; // Remove BrowserRouter
const AuthNav = () => {
  return (
    <div>
        <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a className="text-lg font-bold" href="#">
                {/* <!-- <img src="your-logo.png" alt="GGVIANS Logo" className="inline-block align-middle" width="30" height="30"> --> */}
                
                <Link className="text-gray-700 font-medium mr-4" to="/">PHOTOSHARE</Link>
            </a>
            <div>
            <Link className="text-gray-700 font-medium mr-4" to="/login"><FontAwesomeIcon icon={faUser} /></Link>
            <Link className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300" to="/signup"><FontAwesomeIcon icon={faRightToBracket} /></Link>
            </div>
        </div>
    </nav>
    </div>
  )
}

export default AuthNav