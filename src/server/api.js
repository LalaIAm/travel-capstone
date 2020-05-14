const express = require('express');
const fetch = require('node-fetch');

const { trips, stitch } = require('./db');

const router = express.Router();

const saveNewTrip = async (req, res) => {
  const trip = req.body;
  const user = stitch.auth.user;
  trip.owner_id = user.id;

  try {
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
