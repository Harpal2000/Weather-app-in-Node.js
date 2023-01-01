const express = require('express');

const app = express();

const request = require('request');

const options = {
    method: 'GET',
    url: 'https://forecast9.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': '08904308d9mshbe01773d204b53ep1b4f7ajsnc3e00d0f6711',
        'X-RapidAPI-Host': 'forecast9.p.rapidapi.com',
        useQueryString: true
    }
};
request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});

app.get('/', (req, res) => {
    res.send("my first node js project");
})

app.listen(3000, () => {
    console.log("Connected..")
})