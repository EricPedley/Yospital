const express = require('express')
const fs = require('fs');
const distance = require('./distancecalc');

var app = express()

console.log("Reading hospitals.json into memory...");
const hospitals = JSON.parse(fs.readFileSync('../hospitals.json'));

app.use(express.json());

app.get('/', (req,res) => {
  // Send hospitals close to SF
  let data = {lat: "37.774929", long: "-122.419418"};
  let hospitalData = hospitals.map(x =>
    {
      return {
        id: x.ID,
        name: x.NAME,
        address: `${x.ADDRESS}\n${x.CITY}, ${x.STATE}\n${x.ZIP}`,
        proximity: distance(
          parseFloat(data.lat),
          parseFloat(data.long),
          parseFloat(x.LATITUDE),
          parseFloat(x.LONGITUDE)
        ),
        rating: {
          "Cultural Sensitivity": 5,
          "Hospitality": 5
        }
      };
    }
  );

  let sorted = hospitalData.sort((a, b)=>{
    return a.proximity - b.proximity;
  });

  res.send(JSON.stringify(sorted));
});

app.post('/hospital-list', (req,res) => {
  var data = req.body;

  if (data == undefined) {
    console.error(error);
    res.status(400).send("Bad request! I can't read your JSON.");
  }
  if (!(data.long && data.lat)
    || parseInt(data.long) == NaN
    || parseInt(data.lat) == NaN)
    res.status(400).send("Bad request! You must send latitude and longitude.");

  let hospitalData = hospitals.map(x =>
    {
      return {
        id: x.ID,
        name: x.NAME,
        address: `${x.ADDRESS}\n${x.CITY}, ${x.STATE}\n${x.ZIP}`,
        proximity: distance(
          parseFloat(data.lat),
          parseFloat(data.long),
          parseFloat(x.LATITUDE),
          parseFloat(x.LONGITUDE)
        ),
        rating: {
          "Cultural Sensitivity": 5,
          "Hospitality": 5
        }
      };
    }
  );

  let sorted = hospitalData.sort((a, b)=>{
    return a.proximity - b.proximity;
  });

  res.send(JSON.stringify(sorted));
});

app.listen(3000);
console.log("Now listening on port 3000");
