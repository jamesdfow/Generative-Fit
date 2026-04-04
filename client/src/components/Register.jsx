import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    age: '',
    goal: '',
    experience_level: '',
    days_per_week: '',
    equipment: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/api/auth/register', formData)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.user.id)
      await api.post('/api/workouts/generate', {
        user_id: res.data.user.id,
        goal: res.data.user.goal,
        experience_level: res.data.user.experience_level,
        days_per_week: res.data.user.days_per_week,
        equipment: res.data.user.equipment
      }, {
        headers: { Authorization: `Bearer ${res.data.token}` }
      })
      navigate(`/workout?userId=${res.data.user.id}`)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-600 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
        <p className="text-zinc-400 mb-8">Set up your profile to get a personalized workout plan</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input name="first_name" placeholder="First Name" onChange={handleChange}
              className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input name="last_name" placeholder="Last Name" onChange={handleChange}
              className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <input name="username" placeholder="Username" onChange={handleChange}
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="email" placeholder="Email" onChange={handleChange}
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="age" placeholder="Age" type="number" onChange={handleChange}
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="goal" placeholder="Goal (e.g. build muscle, lose weight)" onChange={handleChange}
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <div className="flex gap-3">
            <input name="experience_level" placeholder="Experience (1-5)" type="number" onChange={handleChange}
              className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input name="days_per_week" placeholder="Days per week" type="number" onChange={handleChange}
              className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <input name="equipment" placeholder="Equipment (e.g. full gym, dumbbells only)" onChange={handleChange}
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange}
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button
  type="submit"
  disabled={loading}
  className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg py-3 transition-colors border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? 'Generating your workout...' : 'Create Account'}
</button>
        </form>
        <p className="text-zinc-400 mt-6 text-center">
          Already have an account?{' '}
          <span onClick={() => navigate('/')} className="text-indigo-400 hover:text-indigo-300 cursor-pointer">
            Log in
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register