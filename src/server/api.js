const express = require('express');
const fetch = require('node-fetch');

const geoUrl = process.env.GEO_URL
const geoApi = process.env.GEO_API
const pixabayUrl = process.env.PHOTO_URL
const pixabayAPI = process.env.PHOTO_API

const { trips, stitch } = require('./db');

const router = express.Router();
let trip = {};

// pixabay api
const getPhotos = async (city) => {
  const options = {
    method: 'GET',
    redirect: 'follow'
  }

  try {
    const response = await fetch(`${pixabayUrl}${city}${pixabayAPI}`, options);
    const result = await response.json();
    console.log('pixabay data: ', result);
    return result
  } catch (err) {
    console.log('error fetching pixabay img: ', err);
  }
}

// geonames api
const getGeonamesData = async (location) => {
  const options = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const request = await fetch(`${geoUrl}${location}${geoApi}`, options);
    const response = await request.json();
    console.log('Geonames data: ', response);
    const data = response.geonames[0];
    return data;
  } catch (err) {
    console.log('Error fetching Geonames data: ', err);
  }
}

// db api

const saveNewTrip = async (req, res) => {
  const trip = req.body;
  const user = stitch.auth.user;
  trip.owner_id = user.id;

  try {
    const tripGeodata = await getGeonamesData(trip.location);
    const images = await getPhotos(trip.location);

    trip.images = images.hits
    trip.countryCode = tripGeodata.countryCode 
    trip.wikiUrl = tripGeodata.wikipediaUrl
    trip.lng = tripGeodata.lng
    trip.lat = tripGeodata.lat
    trip.summary = tripGeodata.summary

    trips
      .insertOne(trip)
      .then(() => console.log('New trip saved: ', trip))
      .catch((err) => console.log('Error saving trip: ', err));
  } catch (err) {
    console.log('Error processing trip: ', err);
  }
};

const getAllTrips = async (req, res) => {
    const allTrips = await trips.find({}, { limit: 10 }).asArray()
    res.send(allTrips)
}

router.post('/newtrip', saveNewTrip);
router.get('/all', getAllTrips);

module.exports = router;
