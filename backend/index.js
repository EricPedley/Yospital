const express = require('express')
const cors = require('cors');
const fs = require('fs');
const distance = require('./distancecalc');
const https = require('https');

var app = express()

console.log("Reading hospitals.json into memory...");
const hospitals = JSON.parse(fs.readFileSync('../hospitals.json'));

app.use(express.json());
app.use(cors());

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
    res.status(400).send("Bad request! I can't read your POST request.");
  }
  if (data.long && data.lat)
    res.send(JSON.stringify(getHospitalData(data.lat, data.long)));
  else if (data.zip)
    https.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${data.zip}&key=AIzaSyDWPDBtuM_FeyGfD58O3LTNzyx_z7TeREI`,
      res2 => {
        if (res2.statusCode !== 200)
          res.status(400).send("Bad zipcode!");

        let rawData = '';
        res2.on('data', chunk => {rawData += chunk;});
        res2.on('end', () => {
          try {
            const geocodeData = JSON.parse(rawData);
            let lat = geocodeData.results[0].geometry.location.lat;
            let long = geocodeData.results[0].geometry.location.lng;
            res.send(JSON.stringify(getHospitalData(lat, long)));
          } catch (err) {
            res.status(500).send("Google Maps API sent bad response");
          }
        });
      });
    else
      res.status(400).send("Bad request! You must send latitude and longitude.");
});

const getHospitalData = (lat, long) => {
  let hospitalData = hospitals.map(x =>
    {
      return {
        id: x.ID,
        name: x.NAME,
        address: `${x.ADDRESS}\n${x.CITY}, ${x.STATE}\n${x.ZIP}`,
        proximity: distance(
          parseFloat(lat),
          parseFloat(long),
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

  return hospitalData.sort((a, b)=>{
    return a.proximity - b.proximity;
  });
}

app.listen(3000);
console.log("Now listening on port 3000");
