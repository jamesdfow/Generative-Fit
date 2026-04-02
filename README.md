# FitGen — AI-Powered Workout Tracker

A full stack fitness application that generates personalized weekly workout plans using AI, and lets users log their progress over time.

## Live Demo
Coming soon

## Tech Stack

**Frontend**
- React + Vite
- React Router
- Axios
- Tailwind CSS

**Backend**
- Node.js + Express
- PostgreSQL (hosted on Supabase)
- JWT authentication
- bcrypt password hashing

**AI**
- Anthropic Claude API for workout plan generation

## Features

- User registration and login with JWT authentication
- AI-generated weekly workout plans based on user parameters (goal, experience level, available equipment, days per week)
- Workout plan displayed and grouped by day
- Exercise logging to track actual sets, reps, and weight used
- Protected routes requiring authentication

## Getting Started

### Prerequisites
- Node.js
- A Supabase account
- An Anthropic API key

### Installation

1. Clone the repo
```
   git clone https://github.com/jamesdfow/fitness-tracker-stuff
```

2. Install backend dependencies
```
   npm install
```

3. Install frontend dependencies
```
   cd client && npm install
```

4. Create a `.env` file in the root with the following:
```
   DATABASE_URL=your_supabase_connection_string
   ANTHROPIC_API_KEY=your_anthropic_api_key
   JWT_SECRET=your_jwt_secret
```

5. Run the backend
```
   npm start
```

6. Run the frontend
```
   cd client && npm run dev
```

## Database Schema

- `users` — stores user profiles and fitness parameters
- `workouts` — stores AI-generated workout plans linked to users
- `exercises` — stores individual exercises within a workout plan
- `logs` — stores completed exercise entries with actual sets, reps, and weight

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in and receive a JWT |
| GET | /api/users/:id | Get a user by ID |
| PUT | /api/users/:id | Update a user profile |
| POST | /api/workouts/generate | Generate a workout plan via AI |
| GET | /api/workouts/:userId | Get a user's current workout plan |
| POST | /api/logs | Log a completed exercise |
| GET | /api/logs/:userId | Get a user's exercise history |
```