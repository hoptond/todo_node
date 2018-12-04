const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

const port = 8080

const connection = mysql.createConnection({
    host: '192.168.20.20',
    user: 'root',
    database: 'todo'
})

app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.redirect('/todos')
})

app.route('/todos')
    .get((req, res) => {
        res.render('home' , { todo: ['feed grass', 'mow cat']})
        //TODO: retrieve todos from database
        //TODO: load template
        //TODO: put todos into template
        //TODO: send to user
    }).post((req, res) => {
        //TODO: get parsed update from NEW form
        //TODO: insert new todo into the database
    })

app.put('/todos/:id', (req, res)=> {
    //TODO: get parsed TODO updates from form on page
    //TODO: update the todo's status in the database
})

app.get('/todos?completed=1', (req, res) => {
    //TODO: only show completed todos
})

app.listen(port, ()=> {
  console.log('node server running')
})