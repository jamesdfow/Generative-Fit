require('dotenv').config()
const db = require('./db')
const express = require('express');
const app = express();
const port = process.env.PORT || 3010;
const usersRouter = require('./routes/users')
const workoutsRouter = require('./routes/workouts')
const logsRouter = require('./routes/logs')
const authRouter = require('./routes/auth')
const cors = require('cors');

app.use(cors({
  origin: 'https://generative-fit.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.options('*', cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/logs', logsRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/users', usersRouter)
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", port);
});

