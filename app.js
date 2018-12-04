const express = require('express')
const exphbs = require('express-handlebars')
const mongoClient = require('mongodb').MongoClient
const mongoUrl = 'mongodb://localhost:27017/'
const assert = require('assert')
const bodyParser = require('body-parser')

const app = express()

const port = 8080

var client = new mongoClient(mongoUrl)

const jsonParser = bodyParser.json()

const urlencondedParser = bodyParser.urlencoded({extended: false})

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/todos')
})

app.route('/todos')
    .get((req, res) => {
        client.connect(function (err, client) {
            const db = client.db('todo')
            let results = db.collection('tasks').find({}).toArray(function (err, docs) {
                console.log(docs)
                if(docs.length > 0) {
                    res.render('home', {tasks: docs})
                }
            })
        })
    })

app.route('/todos/new')
    .post(urlencondedParser, (req, res)=> {
    client.connect(function (err, client) {
        const db = client.db('todo')
        console.log(req.body)
        db.collection('tasks').insertOne({desc: req.body.desc}, (err, r) => {
            assert.equal(err, null)
            assert.equal(1, r.insertedCount)
            console.log('inserted stuff into db')
            res.redirect('/todos')
        })
    })
})

app.put('/todos/:id', jsonParser, (req, res)=> {
    client.connect(function (err, client) {
        const db = client.db('todo')
        console.log(req.params)
        console.log(req.body)
        db.collection('todo').updateOne({_id: req.params.id}, {$set: {status: req.body.status}})
        assert.equal(err, null)
        console.log('updated task' + req.params.id + 'in db with status of ' + req.body.status)
        var dataResponse = json.stringify({id: req.params.id, status: req.body.status})
        res.send(dataResponse)
        //TODO: test this stuff tomorrow to see if it works
    })
})

app.get('/todos?completed=1', (req, res) => {
    //TODO: only show completed todos
})

app.listen(port, ()=> {
  console.log('node server running')
})