const express = require('express');
const app = express();
//const router = express.Router();

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
        
        // database.find({}).sort({date:-1}).exec((err, data) =>{
        //     if(err){
        //         console.log('ERROR: failed to load data from server!');
        //         return res.send(err);
        //     } 
            
        //     console.log('data added to db');
        //     app.render('index', {pos: data});    

        // });

      
    });

});




app.listen(3000, ()=>{
    console.log('listening on port 3000');
});