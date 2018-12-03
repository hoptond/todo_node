const express = require('express')

const app = express()

const port = 8080



app.get('/', (req, res) => {
    res.send("This is where our todo app will go once we've ported it over")
})

app.listen(port, ()=> {
  console.log('node server running')
})
