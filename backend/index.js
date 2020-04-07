const express = require('express')
const cors = require('cors');
const fs = require('fs');
const endpoints = require('./endpoints');

var app = express()

// console.log("Reading hospitals.json into memory...");
// const hospitals = JSON.parse(fs.readFileSync('../hospitals.json'));

app.use(express.json({type:"*/*"}));
app.use(express.static('frontend'));
app.use(cors());

//app.get('/', (req,res)=>{res.redirect('landing.html')});

app.post('/hospital-list', endpoints["hospital-list"]);
app.post('/hospital-info', endpoints["hospital-info"]);
app.post('/submit-review', endpoints["submit-review"]);
// TODO: endpoint for adding a review
let port = process.env.PORT || 3000
app.listen(port);
console.log(`Now listening on port ${port}`);
