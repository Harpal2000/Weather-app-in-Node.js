const express = require('express');

const app = express();

const request = require('request');

const bodyParser = require("body-parser");

var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    if (err) throw err;
    console.log("Connected..")
})