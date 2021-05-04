const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const bodyparser = require('body-parser')
const app = express();
// getting-started.js
// , useUnifiedTopology: true

mongoose.connect('mongodb://localhost/contactD', {useNewUrlParser: true});
const port = 8000;

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

var Contact = mongoose.model('Contact', contactSchema);



// Express Specific Stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());


//Pug specific Stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//Endpoints

app.get('/', (req,res)=>{
    const con = "this is the content of the website";
    const params = {}
    res.status(200).render('home.pug', params)
});

app.get('/contact', (req,res)=>{
    const con = "this is the content of the website";
    const params = {}
    res.status(200).render('contact.pug', params)
});


app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database..");
        
        
    }).catch(()=>{
        res.status(400).send("Item not saved to database");
    })
    // res.status(200).render('contact.pug')
});

//Starting server

app.listen(port, () =>{
    console.log(`The application started successfully at  port ${port}`);
})