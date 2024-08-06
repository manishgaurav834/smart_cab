const ConnectMongo = require('./db');
const express = require('express');
var cors = require('cors');


ConnectMongo();


const app = express()
// respond with "hello world" when a GET request is made to the homepage
app.use(express.json())
app.use(cors())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/trip',require('./routes/trip'))
app.use('/api/cab',require('./routes/cab'))





app.listen(5000, () => {
    console.log(`Example app listening on port 5000`)
  })