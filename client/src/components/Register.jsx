import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
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
    try {
      const res = await axios.post('/api/auth/register', formData)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.user.id)

      // Generate workout immediately after register
      await axios.post('/api/workouts/generate', {
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
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="age" placeholder="Age" type="number" onChange={handleChange} />
      <input name="goal" placeholder="Goal (e.g. build muscle)" onChange={handleChange} />
      <input name="experience_level" placeholder="Experience Level (1-5)" type="number" onChange={handleChange} />
      <input name="days_per_week" placeholder="Days Per Week" type="number" onChange={handleChange} />
      <input name="equipment" placeholder="Equipment (e.g. full gym)" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button type="submit">Create Account</button>
      <p>Already have an account? <span onClick={() => navigate('/login')} style={{cursor:'pointer', color:'blue'}}>Log in</span></p>
    </form>
  )
}

export default Register