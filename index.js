const express = require('express');

const app = express();

const request = require('request');

const bodyParser = require("body-parser");

var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    
    console.log("Connected..")
})

// const request = require('request');

// const options = {
//     method: 'GET',
//     url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
//     qs: { city: 'Seattle' },
//     headers: {
//         'X-RapidAPI-Key': '08904308d9mshbe01773d204b53ep1b4f7ajsnc3e00d0f6711',
//         'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
//         useQueryString: true
//     }
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
// });