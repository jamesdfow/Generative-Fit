const express = require('express')
const router = express.Router()
const db = require('../db')
const Anthropic = require('@anthropic-ai/sdk')
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

router.post('/generate', async (req, res) => {
  const { user_id, goal, experience_level, days_per_week, equipment } = req.body

  try {
    // Step 1: Ask Claude to generate a workout plan
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Generate a ${days_per_week} day workout plan for someone with the following profile:
            - Goal: ${goal}
            - Experience level: ${experience_level} out of 5
            - Available equipment: ${equipment}
            
            Return the response as JSON only, no explanation, in this exact format:
            {
              "exercises": [
                { "day_of_week": "Monday", "name": "Bench Press", "sets": 3, "reps": 8 },
                { "day_of_week": "Monday", "name": "Squat", "sets": 4, "reps": 6 }
              ]
            }`
        }
      ]
    })

    // Step 2: Parse the JSON response from Claude
    const raw = message.content[0].text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(raw)
    // Step 3: Save the workout to the database
    const workoutResult = await db.query(
      `INSERT INTO workouts (user_id, goal, week_start) VALUES ($1, $2, CURRENT_DATE) RETURNING *`,
      [user_id, goal]
    )
    const workout = workoutResult.rows[0]

    // Step 4: Save each exercise to the database
    for (const exercise of parsed.exercises) {
      await db.query(
        `INSERT INTO exercises (workout_id, name, sets, reps, day_of_week) VALUES ($1, $2, $3, $4, $5)`,
        [workout.id, exercise.name, exercise.sets, exercise.reps, exercise.day_of_week]
      )
    }

    // Step 5: Send the workout back to React
    res.status(201).json({ workout, exercises: parsed.exercises })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate workout' })
  }
})

router.get('/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const workoutResult = await db.query(
      `SELECT * FROM workouts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [userId]
    )
    const workout = workoutResult.rows[0]

    if (!workout) {
      return res.status(404).json({ error: 'No workout found for this user' })
    }

    const exercisesResult = await db.query(
      `SELECT * FROM exercises WHERE workout_id = $1`,
      [workout.id]
    )

    res.status(200).json({ workout, exercises: exercisesResult.rows })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch workout' })
  }
})

module.exports = router