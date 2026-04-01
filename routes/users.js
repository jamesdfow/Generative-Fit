const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
    const { first_name, last_name, username, email, age, goal, experience_level, days_per_week, equipment } = req.body

    try {
        const result = await db.query(
      `INSERT INTO users (first_name, last_name, username, email, age, goal, experience_level, days_per_week, equipment)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [first_name, last_name, username, email, age, goal, experience_level, days_per_week, equipment]
    )
    res.status(201).json(result.rows[0])
    }catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create user' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await db.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        )
        res.status(200).json(result.rows[0])
    }catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to get user' })
    }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { first_name, last_name, username, email, age, goal, experience_level, days_per_week, equipment } = req.body

  try {
    const result = await db.query(
      `UPDATE users 
       SET first_name=$1, last_name=$2, username=$3, email=$4, age=$5, goal=$6, experience_level=$7, days_per_week=$8, equipment=$9
       WHERE id=$10
       RETURNING *`,
      [first_name, last_name, username, email, age, goal, experience_level, days_per_week, equipment, id]
    )
    res.status(200).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

module.exports = router