import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams, useNavigate } from 'react-router-dom'

function WorkoutPlan() {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get('userId')
  const navigate = useNavigate()
  const [workout, setWorkout] = useState(null)
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await axios.get(`/api/workouts/${userId}`)
        setWorkout(res.data.workout)
        setExercises(res.data.exercises)
      } catch (err) {
        console.error(err)
      }
    }
    if (userId) fetchWorkout()
  }, [userId])

  // Group exercises by day
  const byDay = exercises.reduce((acc, ex) => {
    if (!acc[ex.day_of_week]) acc[ex.day_of_week] = []
    acc[ex.day_of_week].push(ex)
    return acc
  }, {})

  return (
    <div>
      <h2>Your Workout Plan</h2>
      {Object.entries(byDay).map(([day, exs]) => (
        <div key={day}>
          <h3>{day}</h3>
          {exs.map(ex => (
            <div key={ex.id}>
              <p>{ex.name} -- {ex.sets} sets x {ex.reps} reps</p>
              <button onClick={() => navigate(`/log?userId=${userId}&exerciseId=${ex.id}`)}>Log</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default WorkoutPlan