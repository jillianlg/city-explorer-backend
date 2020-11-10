require('dotenv').config();

const express = require('express');
const cors = require('cors');
const request = require('superagent');
const app = express();
const port = 3000;
const { mungeLocation } = require('.utils.js');

app.use(cors());

// Location API
app.get('/location', async(req, res) => {
  const URL = 'https://us1.locationiq.com/v1/search.php?key={api-key}&q={city-name}&format=json';

  const response = await request.get(URL);
  res.json(response.body);
});

// Weather API
app.get('/weather', async(req, res) => {
  const URL = 'https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key={api-key}';

  const response = await request.get(URL);
  res.json(response.body);
});

// Yelp API
app.get('/yelp', async(req, res) => {
  const URL = 'https://api.yelp.com/v3/businesses/search?latitude={lat}&longitude={lng}';

  const response = await request.get(URL);
  res.json(response.body);
});

// Hiking API
  app.get('/hiking', async(req, res) => {
    const URL = 'https://www.hikingproject.com/data/get-trails?lat={lat}&lon={lng}&maxDistance=200&key={api-key}';

    const response = await request.get(URL);

    const locRes = mungeLocation(response.body);

      res.json(locRes);
  } catch (e) {
      res.json({ error: e.message });
  
  }


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 