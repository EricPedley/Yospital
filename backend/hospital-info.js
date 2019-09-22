module.exports = (req, res) => {
  let mockdata =
    [
      {
      name: "Hospital Name",
      address: "123 Example St.",
      lat: "0",
      long: "0",
      website: "www.example.com",
      reviews: [
        {
      		"id": "me@example.com",
      		"name": "Jane Doe",
          "rating": {
            // The following are all numbers from 1 to 5
            "Cultural Sensitivity": Math.random()*5,
            "Hospitality": Math.random()*5,
            "Quality of Care": Math.random()*5
          },
      		"comment": "This was alright."
        }
      ]
    },
    {
      name: "Hospital Name 2",
      address: "124 Example St.",
      lat: "0",
      long: "0.1",
      website: "www.example2.com",
      reviews: [
        {
      		"id": "me@example2.com",
      		"name": "John Doe",
          "rating": {
            // The following are all numbers from 1 to 5
            "Cultural Sensitivity": Math.random()*5,
            "Hospitality": Math.random()*5,
            "Quality of Care": Math.random()*5
          },
      		"comment": "This was good i guess."
        }
      ]
    }
  ];
  res.send(JSON.stringify(mockdata));
};
