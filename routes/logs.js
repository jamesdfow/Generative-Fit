const authenticateToken = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', authenticateToken, async (req, res) => {
  const { exercise_id, user_id, actual_sets, actual_reps, weight, notes } = req.body

  try {
    const result = await db.query(
      `INSERT INTO logs (exercise_id, user_id, actual_sets, actual_reps, weight, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [exercise_id, user_id, actual_sets, actual_reps, weight, notes]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save log' })
  }
})

router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params

  try {
    const result = await db.query(
      `SELECT logs.*, exercises.name, exercises.day_of_week 
       FROM logs 
       JOIN exercises ON logs.exercise_id = exercises.id
       WHERE logs.user_id = $1
       ORDER BY logs.completed_at DESC`,
      [userId]
    )
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch logs' })
  }
})

module.exports = router