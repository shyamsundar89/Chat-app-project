import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import About from './pages/About'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import UserPage from './pages/UserPage'
import RecentMessagePage from './pages/RecentMessagePage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Protect the /chat route */}
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        <Route path="/users" element={<PrivateRoute element={<UserPage />} />} />
        <Route path="/recent-messages" element={<PrivateRoute element={<RecentMessagePage />} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
