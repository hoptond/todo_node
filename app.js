const express = require('express')

const app = express()

const port = 8080


app.route('/')
    .get((req, res) => {
        res.send("This is where our todo app will go once we've ported it over")
        //TODO: retrieve todos from database
        //TODO: load template
        //TODO: put todos into template
        //TODO: send to user
    }).post((req, res) => {
        //TODO: get parsed TODO updates from form on page
        //TODO: update each entry in the database
    }).put((req, res) => {
    //TODO: get parsed update from NEW form
    //TODO: insert new todo into the database
    })

app.listen(port, ()=> {
  console.log('node server running')
})
