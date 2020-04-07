const https = require('https');
const distance = require('./distancecalc');
const hospitals = require('./hospitals.json');

module.exports = (req,res) => {
  var data = req.body;

  if (data == undefined) {
    console.error(error);
    res.status(400).send("Bad request! I can't read your POST request.");
  }
  if (data.long && data.lat)
    res.send(JSON.stringify(getHospitalData(data.lat, data.long)));
  else if (data.zip)
    https.get(
      `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${data.zip}&rows=1`,
      res2 => {
        if (res2.statusCode !== 200)
          res.status(400).send("Bad zipcode!");

        let rawData = '';
        res2.on('data', chunk => {rawData += chunk;});
        res2.on('end', () => {
          try {
            const geocodeData = JSON.parse(rawData);
            let lat = geocodeData.records[0].fields.latitude;
            let long = geocodeData.records[0].fields.longitude;
            res.send(JSON.stringify(getHospitalData(lat, long)));
          } catch (err) {
            res.status(500).send("Google Maps API sent bad response");
            console.error(err);
          }
        });
      });
    else
      res.status(400).send("Bad request! You must send latitude and longitude, or your ZIP code.");
};

const getHospitalData = (lat, long) => {
  let hospitalData = hospitals.map(x =>
    {
      return {
        id: x.ID,
        name: x.NAME,
        address: `${x.ADDRESS}\n${x.CITY}, ${x.STATE}\n${x.ZIP}`,
        long: x.LONGITUDE,
        lat: x.LATITUDE,
        proximity: distance(
          parseFloat(lat),
          parseFloat(long),
          parseFloat(x.LATITUDE),
          parseFloat(x.LONGITUDE)
        ),
        rating: {
          "Cultural Sensitivity": Math.random()*5,
          "Hospitality": Math.random()*5,
          "Quality of Care": Math.random()*5
        }
      };
    }
  );

  return hospitalData.sort((a, b)=>{
    return a.proximity - b.proximity;
  });
}
