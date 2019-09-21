var express = require('express')
var app = express()

app.use(express.json());

app.get('/hospital-list', (req,res) => {
  res.send('This will send a list of the 20 hospitals closest to SF')
});

app.post('/hopsital-list', (req,res) => {
  res.send(`You sent us "${req.body}".\n`
  + `This will send a list of 20 hospitals within range.`)
});

app.listen(3000);
