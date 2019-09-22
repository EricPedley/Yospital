# Justcare server
Welcome. This is a guide to using the server's API endpoints.

## Setup
For local development, you can host a local server by running the following in
the `backend/` directory.
```js
npm i
npm start

...

// The server is now running on localhost:3000.
```

## `localhost:3000/hospital-list`
Accepts POST request with following data in JSON format:
```js
{
  "lat": "...",
  "long": "..."
}
// OR with zipcode
{
  "zip": "..."
}
```
Returns JSON data in following format:
```js
[
  {
    "id": "0",
    "name": "...",
    "address": "...",
    "proximity": ".2", //in miles
    "lat": "...",
    "long": "...",
    "rating": {
      // all out of 5 stars
      "Cultural Sensitivity": "4.9",
      "Hospitality": "4.7"
    }
  },
  {
    "id": "1",
    "name": "...",
    "address": "...",
    "proximity": ".2", //in miles
    "rating": {
      // all out of 5 stars
      "Cultural Sensitivity": "4.9",
      "Hospitality": "4.7"
    }
  },
  ...
]
```

## `localhost:3000/hospital-info`
Accepts POST request with following data in JSON format:
```js
{
  "id": "..." //ID of the hospital
}
```
Returns JSON data in following format:
```js
{
  name: "",
  address: "",
  lat: "",
  long: "",
  website: "",
  reviews: [
    {
  		"id": "me@example.com",
  		"name": "Jane Doe",
      "rating": {
        // The following are all numbers from 1 to 5
        "Cultural Sensitivity": "...",
        "Hospitality": "...",
        "Quality of Care": "..."
      },
  		"comment": "..."
    },
    ...
  ]
}
```
