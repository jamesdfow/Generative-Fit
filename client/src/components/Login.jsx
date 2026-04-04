import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', formData)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.user.id)
      navigate(`/workout?userId=${res.data.user.id}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-600 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-zinc-400 mb-8">Log in to view your workout plan</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-3 transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="text-zinc-400 mt-6 text-center">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login