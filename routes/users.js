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

module.exports = router