const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const items = require('./routes/api/items')

const app = express()

// Bodyparser Middleware (permet à express d'accéder au contenu "body" des requètes HTTP => equivalent de  Urlencoded)
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoURI

//Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

//Server setup (process.env.PORT is for Heroku)
app.use('/api/items', items)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server connected on port ${port}`))