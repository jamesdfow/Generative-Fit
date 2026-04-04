import { useState } from 'react'
import api from '../api'
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
      await api.post('/logs', {
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
    <div className="min-h-screen bg-zinc-600 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/20">
        <button
          onClick={() => navigate(`/workout?userId=${userId}`)}
          className="text-zinc-300 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back to workout
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Log Exercise</h1>
        <p className="text-zinc-300 mb-8">Record what you actually did</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="actual_sets"
            placeholder="Sets completed"
            type="number"
            onChange={handleChange}
            className="bg-white/10 text-white placeholder-zinc-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
          />
          <input
            name="actual_reps"
            placeholder="Reps completed"
            type="number"
            onChange={handleChange}
            className="bg-white/10 text-white placeholder-zinc-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
          />
          <input
            name="weight"
            placeholder="Weight used (lbs)"
            type="number"
            onChange={handleChange}
            className="bg-white/10 text-white placeholder-zinc-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
          />
          <input
            name="notes"
            placeholder="Notes (optional)"
            onChange={handleChange}
            className="bg-white/10 text-white placeholder-zinc-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
          />
          <button
            type="submit"
            className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg py-3 transition-colors border border-white/30"
          >
            Save Log
          </button>
        </form>
      </div>
    </div>
  )
}

export default LogExercise