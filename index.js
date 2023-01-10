const express = require('express');

const app = express();

const request = require('request');

const bodyParser = require("body-parser");

var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/tomWeather', (req, res) => {
    res.render('tWeather')
})

app.listen(3000, () => {
    
    console.log("Connected..")
})