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
      res.status(400).send("Bad request! You must send latitude and longitude, or your ZIP code.");
};

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
