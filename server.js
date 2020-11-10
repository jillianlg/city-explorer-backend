require('dotenv').config();

const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const port = 3000;
const { mungeLocation, mungeWeather } = require('./utils.js');

app.use(cors());

// Location API
app.get('/location', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_Key}&q=${req.query.location}&format=json`;

    const response = await request.get(URL);
    const locRes = mungeLocation(response.body);

    res.json(locRes);
  } catch(e) {
    res.json({ error: e.message });
  }
});

// Weather API
app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHERBIT_Key}`;

    const response = await request.get(URL);
    const weatherRes = mungeWeather(response.body);

    res.json(weatherRes);
  }
  catch(e) {
    res.json({ error: e.message });
  }
});

// Yelp API
// app.get('/yelp', async(req, res) => {
//   try {
//     const URL = 'https://api.yelp.com/v3/businesses/search?latitude={lat}&longitude={lng}';
    
//     const response = await request.get(URL);
//     const yelpRes = mungeYelp(response.body);

//     res.json(yelpRes);

//   } catch(e) {
//     res.json({ error: e.message });
//   }
// });

// Hiking API
// app.get('/hiking', async(req, res) => {
//   try {
//     const URL = 'https://www.hikingproject.com/data/get-trails?lat={lat}&lon={lng}&maxDistance=200&key={api-key}';

//     const response = await request.get(URL);

//     const hikeRes = mungeHiking(response.body);

//     res.json(hikeRes);
//   } catch(e) {
//     res.json({ error: e.message });
//   }
// });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
