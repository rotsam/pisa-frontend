
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const api = import.meta.env.VITE_API_URL

  const handleSignup = async () => {
    try {
      await axios.post(`${api}/auth/signup`, { email, username, password })
      navigate('/login')
    } catch (err) {
      alert('Signup failed')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="block mb-2 p-2 border rounded w-full" />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block mb-2 p-2 border rounded w-full" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block mb-2 p-2 border rounded w-full" />
      <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2 rounded">Sign Up</button>
    </div>
  )
}
