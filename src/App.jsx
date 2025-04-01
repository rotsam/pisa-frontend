
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import { useAuthStore } from './store/auth'

export default function App() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <header className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">Pisa</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/admin">Admin</Link>
          {!user && <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>}
          {user && (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="text-red-500">Logout</button>
            </>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </div>
  )
}
