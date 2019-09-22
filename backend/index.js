const express = require('express')
const cors = require('cors');
const fs = require('fs');
const distance = require('./distancecalc');
const https = require('https');
const endpoints = require('./endpoints');

var app = express()

console.log("Reading hospitals.json into memory...");
const hospitals = JSON.parse(fs.readFileSync('../hospitals.json'));

app.use(express.json({type:"*/*"}));
app.use(cors());

app.post('/hospital-list', endpoints["hospital-list"]);
app.post('/hospital-info', endpoints["hospital-info"]);
// TODO: endpoint for adding a review

app.listen(3000);
console.log("Now listening on port 3000");
