const express = require('express')
const exphbs = require('express-handlebars')
const Mongo = require('mongodb')
const mongoClient = Mongo.MongoClient
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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.redirect('/todos')
})

app.route('/todos')
    .get((req, res) => {
        var findObject = {}
        if (req.query.completed === '1') {
            findObject = {status: true}
        }
        client.connect(function (err, client) {
            const db = client.db('todo')
            let results = db.collection('tasks').find(findObject).toArray(function (err, docs) {
                if(docs.length > 0) {
                    res.render('home', {tasks: docs})
                }
            })
        })
    })

app.route('/todos')
    .post(urlencondedParser, (req, res)=> {
    client.connect(function (err, client) {
        const db = client.db('todo')
        db.collection('tasks').insertOne({desc: req.body.desc}, (err, r) => {
            assert.equal(err, null)
            assert.equal(1, r.insertedCount)
            console.log('inserted stuff into db')
        })
    })
})

app.put('/todos/:id', jsonParser, (req, res)=> {

    var id = new Mongo.ObjectID(req.params.id);

    client.connect(function (err, client) {
        const db = client.db('todo')
        db.collection('tasks').updateOne({"_id": id}, {$set: {status: req.body.status}}, (err, r) =>{
            assert.equal(err, null)
            console.log('updated task' + req.params.id + ' in db with status of ' + req.body.status)
            res.json({id: req.params.id, status: req.body.status})
        })
    })
})

app.get('/todos?completed=1', (req, res) => {
    //TODO: only show completed todos
})

app.listen(port, ()=> {
  console.log('node server running')
})