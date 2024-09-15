
import { Link } from 'react-router-dom'; // Remove BrowserRouter
import AuthNav from './AuthNav';
// F5F5F5: bg-gray-300
// 48CFCB: bg-sky-400
// 229799: bg-green-500
// 424242: bg-gray-700

const LandingPage = () => {
  return (
    <div className='bg-gray-100'>
      

      <AuthNav/>


    <section className="bg-university py-20">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800 mb-4">Welcome to PHOTOSHARE</h1>
                <p className="text-lg text-gray-700 mb-6">Unlock your potential. PHOTOSHARE is the platform where university students showcase their talents and build connections.</p>
                <Link className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300" to="/signup">Join PHOTOSHARE</Link>
            </div>
        </div>
    </section>


    <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Talents</h2>
                <p className="text-lg text-gray-700">Discover amazing talents from Guru Ghasidas University</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img src="https://i.pinimg.com/564x/bc/d9/8e/bcd98e18d379355982b7ec9376de44ab.jpg" alt="Talent 1" className="w-full h-64 object-cover rounded-lg mb-6"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Musician</h3>
                    <p className="text-gray-700">Discover talented musicians from university.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img src="https://i.pinimg.com/736x/3b/c0/08/3bc008d66f093012560f684a56295bff.jpg" alt="Talent 2" className="w-full h-64 object-cover rounded-lg mb-6"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Artist</h3>
                    <p className="text-gray-700">Explore inspiring artwork by university students.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img src="https://i.pinimg.com/564x/8f/cf/82/8fcf82c7e11c6a9296438d2564fde3e4.jpg" alt="Talent 3" className="w-full h-64 object-cover rounded-lg mb-6"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Writer</h3>
                    <p className="text-gray-700">Immerse yourself in captivating stories and literature.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img src="https://i.pinimg.com/564x/90/44/a6/9044a634e09b2a633ff73efad0fdf470.jpg" alt="Talent 3" className="w-full h-64 object-cover rounded-lg mb-6"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Programing</h3>
                    <p className="text-gray-700">Witness innovative projects and coding skills.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img src="https://i.pinimg.com/564x/35/fa/bd/35fabd648249c731949e85a20a96ba49.jpg" alt="Talent 3" className="w-full h-64 object-cover rounded-lg mb-6"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Dancing</h3>
                    <p className="text-gray-700">Experience the rhythm and creativity of university dancers.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img src="https://i.pinimg.com/736x/5f/f6/ee/5ff6ee704ef73edfc68b02a5dc6e1806.jpg" alt="Talent 3" className="w-full h-64 object-cover rounded-lg mb-6"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">More</h3>
                    <p className="text-gray-700">Find even more talents waiting to be discovered.</p>
                </div>
            </div>
        </div>
    </section>


    <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How It Works</h2>
                <p className="text-lg text-gray-700">Joining PHOTOSHARE is easy! Follow these simple steps:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Sign Up</h3>
                    <p className="text-gray-700">Create your account in just a few clicks.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Showcase Your Talent</h3>
                    <p className="text-gray-700">Upload your work and showcase your talents to the others.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Connect and Explore</h3>
                    <p className="text-gray-700">Connect with like-minded individuals and explore talents from our university.</p>
                </div>
            </div>
        </div>
    </section>


    <footer className="footer">
        <div className="container mx-auto px-4 py-8 text-center">
            <span className="text-gray-400 ">© 2024 PHOTOSHARE. All rights reserved.</span>
        </div>
    </footer>
    </div>
  );
}

export default LandingPage;
