import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function OnboardingForm() {
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
    equipment: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Step 1: Create the user
      const userRes = await axios.post('/api/users', formData)
      const user = userRes.data

      // Step 2: Generate their workout
      await axios.post('/api/workouts/generate', {
        user_id: user.id,
        goal: user.goal,
        experience_level: user.experience_level,
        days_per_week: user.days_per_week,
        equipment: user.equipment
      })

      // Step 3: Navigate to their workout plan
      navigate(`/workout?userId=${user.id}`)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your Profile</h2>
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="age" placeholder="Age" type="number" onChange={handleChange} />
      <input name="goal" placeholder="Goal (e.g. build muscle)" onChange={handleChange} />
      <input name="experience_level" placeholder="Experience Level (1-5)" type="number" onChange={handleChange} />
      <input name="days_per_week" placeholder="Days Per Week" type="number" onChange={handleChange} />
      <input name="equipment" placeholder="Equipment (e.g. full gym)" onChange={handleChange} />
      <button type="submit">Generate My Workout</button>
    </form>
  )
}

export default OnboardingForm