const { json } = require('express');
const express = require('express');
const app = express();

const DataStore = require('nedb');
const database = new DataStore('database.db');
database.loadDatabase();


app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) =>{
    console.log('new GET command!');
    database.find({}).sort({date: -1}).exec((err, data) =>{
        if(err){
            console.log('ERROR: failed to load data from server!');
            return;
        }
        res.render('index', {pos: data});
        return;

    });

});


app.post('/', (req, res) => {

    //check if data already exist

    database.insert(req.body, (err, num) => {
        if(err){
            console.log(err);

            res.send(err); 
            return console.log('ERROR: while inserting data in db');
        }
    });

});

app.put('/:e', (req, res) => {
    database.remove({pos: req.params.e}, {}, (err, num)=>{
        if(err){
            console.log(`cannot delete item: ${req.params.e}`);
            return res.send(err);
        }
        database.persistence.compactDatafile();

    })


});


app.listen(3000, ()=>{
    console.log('listening on port 3000');
});