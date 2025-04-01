
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Catalog from './pages/Catalog'
from routes_auth import router as auth_router
app.include_router(auth_router)
export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <header className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">Pisa</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}
