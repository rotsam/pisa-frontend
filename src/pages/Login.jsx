
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const api = import.meta.env.VITE_API_URL

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${api}/auth/login`, { email, password })
      const token = res.data.access_token
      const payload = JSON.parse(atob(token.split('.')[1]))
      login({ username: email, id: payload.sub, role: payload.role }, token)
      navigate('/catalog')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block mb-2 p-2 border rounded w-full" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block mb-2 p-2 border rounded w-full" />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  )
}
