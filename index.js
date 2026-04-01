require('dotenv').config()
const db = require('./db')
const express = require('express');
const app = express();
const port = 3010;
const usersRouter = require('./routes/users')
const workoutsRouter = require('./routes/workouts')
app.use(express.json())

app.use('/api/workouts', workoutsRouter)
app.use('/api/users', usersRouter)
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", port);
});

