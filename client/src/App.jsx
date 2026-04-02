import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import WorkoutPlan from './components/WorkoutPlan'
import LogExercise from './components/LogExercise'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workout" element={<WorkoutPlan />} />
        <Route path="/log" element={<LogExercise />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App