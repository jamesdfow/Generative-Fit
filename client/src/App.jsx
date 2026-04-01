import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OnboardingForm from './components/OnboardingForm'
import WorkoutPlan from './components/WorkoutPlan'
import LogExercise from './components/LogExercise'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingForm />} />
        <Route path="/workout" element={<WorkoutPlan />} />
        <Route path="/log" element={<LogExercise />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App