const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register
router.post('/register', async (req, res) => {
  const { first_name, last_name, username, email, age, goal, experience_level, days_per_week, equipment, password } = req.body

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.query(
      `INSERT INTO users (first_name, last_name, username, email, age, goal, experience_level, days_per_week, equipment, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [first_name, last_name, username, email, age, goal, experience_level, days_per_week, equipment, hashedPassword]
    )

    const user = result.rows[0]
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({ user, token })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const result = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    )
    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.status(200).json({ user, token })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
})

module.exports = router