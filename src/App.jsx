import LandingPage from "./Components/Auth/LandingPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/Components/Main/Home.jsx';
import Login from '../src/Components/Auth/Login.jsx';
import Signup from '../src/Components/Auth/Signup.jsx';
import VerifyOtp from '../src/Components/Auth/VerifyOtp.jsx';
import Profile from '../src/Components/Main/Profile.jsx';
import Chat from '../src/Components/Main/Chat.jsx';
import Notification from '../src/Components/Main/Notification.jsx';
import Post from './Components/Main/PostForm.jsx';
import Settings from '../src/Components/Main/Settings.jsx';
import ResetPassword from "../src/Components/Auth/ResetPassword.jsx";
import ResetPasswordForm from "../src/Components/Auth/ResetPasswordForm.jsx";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/post" element={<Post />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/resetPasswordForm" element={<ResetPasswordForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
