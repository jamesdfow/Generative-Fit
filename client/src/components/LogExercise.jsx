import { useState } from 'react'
import axios from 'axios'
import { useSearchParams, useNavigate } from 'react-router-dom'

function LogExercise() {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const exerciseId = searchParams.get('exerciseId')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    actual_sets: '',
    actual_reps: '',
    weight: '',
    notes: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/logs', {
  user_id: userId,
  exercise_id: exerciseId,
  ...formData
}, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      navigate(`/workout?userId=${userId}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Log Exercise</h2>
      <form onSubmit={handleSubmit}>
        <input name="actual_sets" placeholder="Sets completed" type="number" onChange={handleChange} />
        <input name="actual_reps" placeholder="Reps completed" type="number" onChange={handleChange} />
        <input name="weight" placeholder="Weight used (lbs)" type="number" onChange={handleChange} />
        <input name="notes" placeholder="Notes" onChange={handleChange} />
        <button type="submit">Save Log</button>
      </form>
    </div>
  )
}

export default LogExercise