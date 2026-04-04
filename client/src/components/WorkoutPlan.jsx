import { useEffect, useState } from 'react'
import api from '../api'
import { useSearchParams, useNavigate } from 'react-router-dom'

function WorkoutPlan() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const userId = searchParams.get('userId')
  const navigate = useNavigate()
  const [workout, setWorkout] = useState(null)
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await api.get(`/workouts/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setWorkout(res.data.workout)
        setExercises(res.data.exercises)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    if (userId) fetchWorkout()
  }, [userId])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/')
  }

  const byDay = exercises.reduce((acc, ex) => {
    if (!acc[ex.day_of_week]) acc[ex.day_of_week] = []
    acc[ex.day_of_week].push(ex)
    return acc
  }, {})

  if (loading) {
  return (
    <div className="min-h-screen bg-zinc-600 flex items-center justify-center">
      <p className="text-white text-xl font-semibold animate-pulse">Loading your workout...</p>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-zinc-600 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Your Workout Plan</h1>
          <button
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors border border-white/30"
          >
            Log Out
          </button>
        </div>
        {Object.entries(byDay).map(([day, exs]) => (
          <div key={day} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">{day}</h2>
            <div className="flex flex-col gap-3">
              {exs.map(ex => (
                <div key={ex.id} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-white font-medium">{ex.name}</p>
                    <p className="text-zinc-300 text-sm">{ex.sets} sets x {ex.reps} reps</p>
                  </div>
                  <button
                    onClick={() => navigate(`/log?userId=${userId}&exerciseId=${ex.id}`)}
                    className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors border border-white/30"
                  >
                    Log
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutPlan