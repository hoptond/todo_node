const express = require('express')
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

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
                console.log(docs)
                if(docs.length > 0) {
                    res.json(docs)
                }
            })
        })
    })

app.route('/todos')
    .post(jsonParser, (req, res)=> {
    client.connect(function (err, client) {
        console.log(req.body)
        const db = client.db('todo')
        db.collection('tasks').insertOne({desc: req.body.desc}, (err, r) => {
            assert.equal(err, null)
            console.log('inserted new task with description of ' + req.body.desc + ' into db')
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

app.listen(port, ()=> {
  console.log('node server running')
})